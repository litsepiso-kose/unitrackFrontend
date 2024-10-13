import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useUser } from '../redux/user-slice';

declare global {
    interface Window {
        webkitSpeechRecognition: typeof SpeechRecognition;
    }

    let SpeechRecognition: {
        new (): SpeechRecognition;
    } | undefined;

    interface SpeechRecognition extends EventTarget {
        continuous: boolean;
        interimResults: boolean;
        lang: string;
        start(): void;
        stop(): void;
        onstart: (() => void) | null;
        onresult: ((event: SpeechRecognitionEvent) => void) | null;
        onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
        onend: (() => void) | null;
    }

    interface SpeechRecognitionEvent extends Event {
        readonly resultIndex: number;
        readonly results: SpeechRecognitionResultList;
    }

    interface SpeechRecognitionErrorEvent extends Event {
        readonly error: string;
    }

    interface SpeechRecognitionResultList {
        readonly length: number;
        item(index: number): SpeechRecognitionResult;
        [index: number]: SpeechRecognitionResult;
    }

    interface SpeechRecognitionResult {
        readonly length: number;
        readonly isFinal: boolean;
        item(index: number): SpeechRecognitionAlternative;
        [index: number]: SpeechRecognitionAlternative;
    }

    interface SpeechRecognitionAlternative {
        readonly transcript: string;
        readonly confidence: number;
    }
}

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;

const useSpeechRecognition = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const { i18n } = useTranslation();
    const socketRef = useRef<Socket | null>(null);
    const [translatedText, setTranslatedText] = useState<string>('');
    const { roomId } = useParams();
    const user = useUser()

    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const isRecognitionRunningRef = useRef<boolean>(false); // Track recognition state
    const shouldRestartRecognitionRef = useRef<boolean>(true); // Control restarting

    const sendTranslation = (text: string) => {
        if (socketRef.current) {
            socketRef.current.emit('send_translation', {
                text: text,
                src_lang: i18n.language,
            });
            console.log(`Sent to server for translation: ${text} (${i18n.language})`);
        }
    };

    // Initialize the socket connection for translation
    useEffect(() => {
        socketRef.current = io(SOCKET_SERVER_URL);

        socketRef.current.emit('join_room', { room_id: roomId, lang: i18n.language });

        socketRef.current.on('translated', (data) => {
            console.log(`Received translated text: ${data.text} in language ${data.lang}`);
            setTranslatedText(data.text);
            playText(data.text, user.voiceLanguage || data.lang);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [roomId, i18n.language, user.voiceLanguage]);

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            console.error('Web Speech API is not supported by this browser.');
            setError('Web Speech API is not supported by this browser.');
            return;
        }
    
        if (!recognitionRef.current) {
            if (typeof window.webkitSpeechRecognition !== 'undefined') {
                recognitionRef.current = new window.webkitSpeechRecognition();
            } else {
                console.error('Web Speech API is not supported by this browser.');
                setError('Web Speech API is not supported by this browser.');
                return;
            }
    
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = i18n.language;
    
            recognitionRef.current.onstart = () => {
                console.log('Speech recognition started.');
                setIsListening(true);
                isRecognitionRunningRef.current = true;
            };
    
            recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
                let interimTranscript = '';
                let finalTranscript = '';
    
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const result = event.results[i];
                    const transcriptPart = result[0].transcript;
    
                    if (result.isFinal) {
                        finalTranscript += transcriptPart;
                    } else {
                        interimTranscript += transcriptPart;
                    }
                }
    
                if (finalTranscript) {
                    setTranscript((prev) => prev + finalTranscript);
                    sendTranslation(finalTranscript);
                }
    
                console.log('Interim transcript:', interimTranscript);
            };
    
            recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error('Speech recognition error:', event.error);
                setError(event.error);
    
                if (event.error === 'no-speech') {
                    console.log('No speech detected, restarting recognition...');
                    shouldRestartRecognitionRef.current = true;
                } else {
                    shouldRestartRecognitionRef.current = false;
                    setIsListening(false);
                }
            };
    
            recognitionRef.current.onend = () => {
                console.log('Speech recognition ended.');
                isRecognitionRunningRef.current = false;
                setIsListening(false);
    
                if (shouldRestartRecognitionRef.current) {
                    console.log('Restarting speech recognition...');
                    setTimeout(() => {
                        startRecognition();
                    }, 500);
                }
            };
        }
    
        startRecognition();
    };
    

    const startRecognition = () => {
        if (recognitionRef.current && !isRecognitionRunningRef.current) {
            try {
                recognitionRef.current.start();
                isRecognitionRunningRef.current = true;
                setIsListening(true);
            } catch (e) {
                console.error('Error starting recognition:', e);
                isRecognitionRunningRef.current = false;
            }
        } else {
            console.log('Recognition is already running or not initialized.');
        }
    };

    const stopListening = () => {
        shouldRestartRecognitionRef.current = false; // Prevent restarting
        if (recognitionRef.current && isRecognitionRunningRef.current) {
            recognitionRef.current.stop();
            isRecognitionRunningRef.current = false;
            setIsListening(false);
        }
    };

    useEffect(() => {
        startListening();

        return () => {
            stopListening();
            if (recognitionRef.current) {
                recognitionRef.current.onstart = null;
                recognitionRef.current.onresult = null;
                recognitionRef.current.onerror = null;
                recognitionRef.current.onend = null;
                recognitionRef.current = null;
            }
        };
    }, []);

    return {
        isListening,
        transcript,
        translatedText,
        error,
        sendTranslation,
    };
};

export default useSpeechRecognition;

export const playText = (text: string, language: string) => {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);

        const voices = window.speechSynthesis.getVoices();
        const targetVoice = voices.find((voice) => voice.lang.startsWith(language));

        if (targetVoice) {
            utterance.voice = targetVoice;
            utterance.lang = targetVoice.lang;
            console.log(`Using voice: ${targetVoice.name}, language: ${targetVoice.lang}`);
        } else {
            console.log(`No matching voice found for language: ${language}, using default.`);
            utterance.lang = language;
        }

        window.speechSynthesis.speak(utterance);
    } else {
        console.error('Speech Synthesis API is not supported in this browser.');
    }
};
