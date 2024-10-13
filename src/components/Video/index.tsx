
import {
  MicOffOutlined,
  KeyboardVoiceOutlined,
  FullscreenOutlined,
} from "@mui/icons-material";
import {
  AspectRatio,
  Box,
  Card,
  CardCover,
  Typography,
  IconButton,
} from "@mui/joy";
import { useEffect, useRef, useState } from "react";
//import { useMeeting } from "../hooks/useMeeting";

interface Props {
  email: string;
  stream?: MediaStream;
  muted: boolean;
  videoRef?: React.RefObject<HTMLVideoElement>;
  isLocalStream?: boolean;
  toggleAudio: () => void;
  isChatOpen: boolean;
  roomId: boolean;
}



const Video = ({
  email,
  stream,
  muted = false,
  videoRef,
  isLocalStream,
  toggleAudio,
  isChatOpen, 
}: Props) => {
  const internalRef = useRef<HTMLVideoElement>(null);
  const usedRef = videoRef || internalRef;
  const [isMuted, setIsMuted] = useState<boolean>(muted);

  useEffect(() => {
    if (usedRef.current && stream) {
      usedRef.current.srcObject = stream;
    }
  }, [stream, usedRef]);

  useEffect(() => {
    setIsMuted(muted);
  }, [muted]);

  useEffect(() => {
    setIsMuted(isLocalStream ? false : isMuted);
  }, [isLocalStream]);

  const handleToggleAudio = () => {
    setIsMuted((prev) => {
      const newMutedState = !prev;
      toggleAudio();
      return newMutedState;
    });
  };

  const toggleFullScreen = () => {
    if (usedRef.current) {
      const element = usedRef.current as HTMLElement;
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        element.requestFullscreen({ navigationUI: "hide" });
      }
    }
  };

  return (
    <Card
      variant="plain"
      sx={{
        width: 1,
        bgcolor: "initial",
        p: 0,
        position: "relative",
        display: "flex",
        borderRadius: "8px", 
        overflow: "hidden", 
      }}
    >
      <Box sx={{ position: "relative" }}>
        <AspectRatio ratio="7/7">
          <Box
            component="video"
            muted={isLocalStream || isMuted}
            ref={usedRef}
            autoPlay
            controls={false}
            loop
            sx={{
              //p: 10,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AspectRatio>
        <CardCover
          className="gradient-cover"
          sx={{
            //top: isChatOpen ? -400 : -800,
            position: "absolute",
            bottom: "0",
            width: "98%",
            transition: "0.1s ease-in",
          }}
        >
          <Box
            sx={{
              p: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "absolute",
              top: isChatOpen  || stream ? 300 : 300,
              left: 10,
              right: 0,
              width: "98%",
            }}
          >
            <Typography
              level="h2"
              noWrap
              sx={{
                
                flex: 1,
                fontSize: { xs: "sm", md: "lg" },
                color: "#fff",
                textOverflow: "ellipsis",
                overflow: "hidden",
                display: "block",
              }}
            >
              {email}
            </Typography>

            <IconButton
              size="md"
              variant="solid"
              color="neutral"
              sx={{
                borderRadius: "50%",
                marginLeft: 2,
              }}
              onClick={toggleFullScreen}
            >
              <FullscreenOutlined />
            </IconButton>

            <IconButton
              size="md"
              variant="solid"
              color="neutral"
              sx={{
                borderRadius: "50%",
              }}
              onClick={handleToggleAudio}
            >
              {isMuted ? <MicOffOutlined /> : <KeyboardVoiceOutlined />}
            </IconButton>
          </Box>
        </CardCover>
      </Box>
    </Card>
  );
};

export default Video;
