import { Box, Grid } from "@mui/joy";
import Video from "../components/Video";
import Chat from "../components/Chat";
import { MediaControlPanel } from "../components/MediaControlPanel";
import AlertDialogModal from "../components/Alert";
import { useMeeting } from "../hooks/useMeeting";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import { useState } from "react";
import { useUser } from "../redux/user-slice";

const Meeting = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const localUser = useUser();

  const {
    alert,
    users,
    isAudioMuted,
    isVideoEnabled,
    isCaptionsEnabled,
    isRecording,
    localVideoRef,
    toggleAudio,
    toggleVideo,
    toggleCaptions,
    toggleRecording,
    leaveCall,
    startScreenShare,
    changeLanguage,
    socketRef,
  } = useMeeting();

  useSpeechRecognition();

  // Define styles based on chat visibility
  const meetingStyles = {
    width: "180%",
    height: "50vh",
    //backgroundColor: "black",
    justifyContent: "center",
    display: "flex",
  };

  const videoStyle = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    minWidth: isChatOpen ? "82%" : "72%",
  };

  const numberOfUsers = users.length + 1;
  const columns = numberOfUsers <= 4 ? 12 / numberOfUsers : 6;

  return (
    <Box sx={meetingStyles}>
      <Chat
        isChatOpen={isChatOpen}
        socket={socketRef.current}
        setIsChatOpen={setIsChatOpen}
      />

      <Box sx={videoStyle}>
        <Grid container display="flex" xs={isChatOpen ? 8 : 9} spacing={1}>
          {/* Local User Video */}
          <Grid
            xs={columns}
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={"50vh"}
            sx={{
              borderRadius: "8px",
              overflow: "hidden",
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.02)" },
            }}
          >
            <Video
              toggleAudio={toggleAudio}
              email={localUser.email ?? "Unknown user"}
              videoRef={localVideoRef}
              muted={isAudioMuted}
              isLocalStream={true}
              isChatOpen={isChatOpen}
              roomId
            />
          </Grid>

          {/* Remote Users Video */}
          {users.map(
            (user, index) =>
              user.stream?.active && (
                <Grid
                  key={index}
                  xs={columns}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minHeight={"50vh"}
                  sx={{
                    borderRadius: "8px",
                    overflow: "hidden",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.02)" },
                  }}
                >
                  <Video
                    email={user.email}
                    isLocalStream={false}
                    stream={user.stream}
                    muted={user.muted ?? false}
                    toggleAudio={() => toggleAudio()}
                    isChatOpen={isChatOpen}
                    roomId
                  />
                </Grid>
              )
          )}
        </Grid>

        {/* Media Control Panel */}
        <MediaControlPanel
          toggleRecording={toggleRecording}
          isRecording={isRecording}
          shareScreen={startScreenShare}
          toggleAudio={toggleAudio}
          toggleVideo={toggleVideo}
          leaveCall={leaveCall}
          setTranslationLanguage={changeLanguage}
          isAudioMuted={isAudioMuted}
          isVideoEnabled={isVideoEnabled}
          isCaptionsEnabled={isCaptionsEnabled}
          toggleCaptions={toggleCaptions}
          changeVoiceLanguage={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        {alert && (
          <AlertDialogModal
            message={alert.message}
            onClose={alert.onClose}
            onYes={alert.onYes}
            type={alert.type}
          />
        )}
      </Box>
    </Box>
  );
};
export default Meeting;
