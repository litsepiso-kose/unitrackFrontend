import { useState, useEffect } from "react";

export const useVoices = (languageFilter: string | undefined) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        const populateVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();

            // Reduce to only unique languages
            const uniqueVoices = availableVoices.reduce((acc, currentVoice) => {
                // Extract language part from lang (like 'en' from 'en-US')
                const lang = currentVoice.lang;

                // Check if the language is already in the accumulator
                if (!acc.some((voice) => voice.lang === lang)) {
                    acc.push(currentVoice);
                }

                return acc;
            }, [] as SpeechSynthesisVoice[]);
            if (languageFilter) {
                // Optionally filter by the current language if needed
                const filteredVoices = uniqueVoices.filter((voice) =>
                    voice.lang.includes(languageFilter)
                );

                setVoices(filteredVoices);
            } else {
                setVoices(uniqueVoices);
            }
        };

        // Populate voices when voices are available
        window.speechSynthesis.onvoiceschanged = populateVoices;
        populateVoices();
    }, [languageFilter]);

    return voices;
};
