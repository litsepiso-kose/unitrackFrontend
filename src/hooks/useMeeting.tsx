import { useCallback, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useUser } from '../redux/user-slice';
import { useParams } from 'react-router-dom';
import { AlertProps } from '../components/Alert';
import { Language } from '../helpers/i18n';
import { useTranslation } from 'react-i18next';
import { updateLanguage } from '../redux/meeting-slice';
import { useAppDispatch } from '../redux/hooks';
import { saveAs } from 'file-saver';

type WebRTCUser = {
    id: string;
    email: string;
    stream: MediaStream;
    language: string;
    muted?: boolean;
};

const pc_config = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun.l.google.com:5349" },
    { urls: "stun:stun1.l.google.com:3478" },
    { urls: "stun:stun1.l.google.com:5349" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:5349" },
    { urls: "stun:stun3.l.google.com:3478" },
    { urls: "stun:stun3.l.google.com:5349" },
    { urls: "stun:stun4.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:5349" },
  ],
};

const SOCKET_SERVER_URL = import.meta.env.VITE_APP_SOCKET_ENDPOINT;

const alerts: AlertProps[] = [
  {
    message: "The device is currently in use or not accessible",
    type: "error",
    onClose: () => {},
    onYes: () => {},
  },
  {
    message: "An error occurred",
    type: "error",
    onClose: () => {},
    onYes: () => {},
  },
  {
    message:
      "The meeting room is full. Please ask the host to uprade to premium to accommodate more users than the basic limit.",
    type: "notice",
    onClose: () => {
      window.location.href = "/";
    },
    onYes: () => {},
  },
];

export const useMeeting = () => {
  const user = useUser();
  const { roomId } = useParams();
  const socketRef = useRef<Socket | null>(null); // Initialize the socketRef
  const localStreamRef = useRef<MediaStream>();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const [alert, setAlert] = useState<AlertProps>();
  const [users, setUsers] = useState<WebRTCUser[]>([]);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isCaptionsEnabled, setIsCaptionsEnabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

    const { i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const currentLanguage = i18n.language;

    function changeLanguage({ script }: Language) {
        dispatch(updateLanguage(script));
        socketRef.current?.emit("updateLanguage", script);
    }

  const startRecording = () => {
    if (localStreamRef.current) {
      const audioStreams = users
        .map((user) => user.stream)
        .concat(localStreamRef.current)
        .filter((stream) => stream.getAudioTracks().length > 0);
      const combinedStream = new MediaStream(
        audioStreams.flatMap((stream) => stream.getAudioTracks())
      );

      mediaRecorderRef.current = new MediaRecorder(combinedStream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "audio/webm",
        });
        saveAs(blob, "recording.webm");
        recordedChunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const leaveCall = useCallback(() => {
    // Notify other users
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    // Stop all local media tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    // Close all PeerConnections
    Object.values(pcsRef.current).forEach((pc) => {
      pc.close();
    });
    pcsRef.current = {};

    setUsers([]);
  }, []);

  const toggleAudio = useCallback(() => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });

      const muted = !isAudioMuted;

      setIsAudioMuted(muted);
      socketRef.current?.emit("muted", muted);
    }
  }, [isAudioMuted]);

  const toggleCaptions = useCallback(() => {
    setIsCaptionsEnabled(!isCaptionsEnabled);
  }, [isCaptionsEnabled]);

  const toggleVideo = useCallback(() => {
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  }, [isVideoEnabled]);

  const muteUser = useCallback((id: string) => {
    socketRef.current?.emit("mute_user", id);
  }, []);

  const getLocalStream = useCallback(async () => {
    try {
      localStreamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 240,
          height: 240,
        },
      });

      if (localVideoRef.current)
        localVideoRef.current.srcObject = localStreamRef.current;
      if (!socketRef.current) return;

            const current_id = sessionStorage.getItem("id");
            if (current_id !== socketRef.current.id) {
                socketRef.current.emit('join_room', {
                    room: roomId,
                    email: user.email,
                    language: currentLanguage,
                    userType: user.userType
                });
                sessionStorage.setItem("id", String(socketRef.current.id));
            }
        } catch (e) {
            if (e instanceof DOMException) {
                switch (e.name) {
                    case 'NotReadableError':
                        setAlert(alerts[0]);
                        break;
                    default:
                        setAlert(alerts[alerts.length - 1]);
                        console.log('An error occurred: ', e.message);
                        break;
                }
            } else {
                console.log('An unexpected error occurred: ', e);
            }
        }
    }, [roomId, user.email]);

    const createPeerConnection = useCallback((socketId: string, email: string, language: string) => {
        try {
            const pc = new RTCPeerConnection(pc_config);

        pc.onicecandidate = (e) => {
          if (!(socketRef.current && e.candidate)) return;
          socketRef.current.emit("candidate", {
            candidate: e.candidate,
            candidateSendID: socketRef.current.id,
            candidateReceiveID: socketId,
          });
        };

        pc.oniceconnectionstatechange = (e) => {
          console.log(e);
        };

            pc.ontrack = (e) => {
                setUsers((oldUsers) =>
                    oldUsers
                        .filter((user) => user.id !== socketId)
                        .concat({
                            id: socketId,
                            email,
                            stream: e.streams[0],
                            language
                        }),
                );
            };

        if (localStreamRef.current) {
          localStreamRef.current.getTracks().forEach((track) => {
            if (!localStreamRef.current) return;
            pc.addTrack(track, localStreamRef.current);
          });
        }

        return pc;
      } catch (e) {
        console.error(e);
        return undefined;
      }
    },
    []
  );

  const startScreenShare = useCallback(async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      const videoTrack = screenStream.getVideoTracks()[0];
      Object.values(pcsRef.current).forEach((pc) => {
        const sender = pc.getSenders().find((s) => s.track?.kind === "video");
        sender?.replaceTrack(videoTrack);
      });

      videoTrack.onended = () => {
        stopScreenShare();
      };
    } catch (e) {
      console.error("Error starting screen share: ", e);
    }
  }, []);

  const stopScreenShare = useCallback(async () => {
    try {
      const webcamStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      const videoTrack = webcamStream.getVideoTracks()[0];
      Object.values(pcsRef.current).forEach((pc) => {
        const sender = pc.getSenders().find((s) => s.track?.kind === "video");
        sender?.replaceTrack(videoTrack);
      });

      setIsVideoEnabled(true);
    } catch (e) {
      console.error("Error stopping screen share: ", e);
    }
  }, []);

  useEffect(() => {
    if (!SOCKET_SERVER_URL) return;

    // Initialize socketRef.current here
    socketRef.current = io(SOCKET_SERVER_URL);

    getLocalStream();

        if (socketRef.current) {
            socketRef.current.on('all_users', (allUsers: [{ id: string; email: string; language: string }]) => {
                allUsers.forEach(user => {
                    if (!localStreamRef.current) return;
                    const pc = createPeerConnection(user.id, user.email, user.language);
                    if (!(pc && socketRef.current)) return;
                    pcsRef.current = { ...pcsRef.current, [user.id]: pc };
                    pc.createOffer({
                        offerToReceiveAudio: true,
                        offerToReceiveVideo: true,
                    }).then((localSdp) => {
                        pc.setLocalDescription(localSdp);
                        socketRef.current?.emit('offer', {
                            sdp: localSdp,
                            offerSendID: socketRef.current.id,
                            offerSendEmail: user.email,
                            offerReceiveID: user.id,
                            offerLanguage: currentLanguage
                        });
                    }).catch(e => console.error(e));
                });
            });

            socketRef.current.on('getOffer', async (data: { sdp: RTCSessionDescription; offerSendID: string; offerSendEmail: string; offerLanguage: string }) => {
                const { sdp, offerSendID, offerSendEmail, offerLanguage } = data;
                if (!localStreamRef.current) return;
                const pc = createPeerConnection(offerSendID, offerSendEmail, offerLanguage);
                if (!(pc && socketRef.current)) return;
                pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
                await pc.setRemoteDescription(new RTCSessionDescription(sdp));
                const localSdp = await pc.createAnswer({
                    offerToReceiveVideo: true,
                    offerToReceiveAudio: true,
                });
                await pc.setLocalDescription(new RTCSessionDescription(localSdp));
                socketRef.current.emit('answer', {
                    sdp: localSdp,
                    answerSendID: socketRef.current.id,
                    answerReceiveID: offerSendID,
                });
            });

      socketRef.current.on(
        "getAnswer",
        (data: { sdp: RTCSessionDescription; answerSendID: string }) => {
          const { sdp, answerSendID } = data;
          const pc = pcsRef.current[answerSendID];
          if (!pc) return;
          pc.setRemoteDescription(new RTCSessionDescription(sdp));
        }
      );

      socketRef.current.on(
        "getCandidate",
        async (data: {
          candidate: RTCIceCandidateInit;
          candidateSendID: string;
        }) => {
          const pc = pcsRef.current[data.candidateSendID];
          if (!pc) return;
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      );

      socketRef.current.on("user_exit", (data: { id: string }) => {
        if (!pcsRef.current[data.id]) return;
        pcsRef.current[data.id].close();
        delete pcsRef.current[data.id];
        setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
      });

      socketRef.current.on("muted", (data) => {
        const { muted, id } = data;
        setUsers((oldUsers) =>
          oldUsers.map((user) => (user.id === id ? { ...user, muted } : user))
        );
      });

            socketRef.current.on('mute_user', toggleAudio);

            socketRef.current.on('getLanguage', ({ language, id }: { language: string, id: string }) => {
                setUsers((oldUsers) => oldUsers.map(user => user.id === id ? { ...user, language } : user));
            });

            socketRef.current.on('room_full', () => {
                setAlert(alerts[2]);
            });
        }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      users.forEach((user) => {
        if (!pcsRef.current[user.id]) return;
        pcsRef.current[user.id].close();
        delete pcsRef.current[user.id];
      });
    };
  }, [createPeerConnection, getLocalStream]);

    return {
        user,
        alert,
        users,
        isAudioMuted,
        isVideoEnabled,
        isCaptionsEnabled,
        isRecording,
        mediaRecorderRef,
        localStreamRef,
        localVideoRef,
        startRecording,
        stopRecording,
        toggleRecording,
        leaveCall,
        toggleAudio,
        toggleVideo,
        toggleCaptions,
        muteUser,
        getLocalStream,
        startScreenShare,
        stopScreenShare,
        createPeerConnection,
        changeLanguage,
        socketRef,
    };
};
