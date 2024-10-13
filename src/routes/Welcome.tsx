import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Box, Button, Divider, Grid, Input, Typography } from "@mui/joy";
import { VideoCallOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../helpers/common";

function Welcome() {
  const { t } = useTranslation();
  const [code_or_link, setCode_or_link] = useState<string>();
  const [isMeetingActive, setIsMeetingActive] = useState<boolean>(false);
  const navigate = useNavigate();
  // const [createRoom] = useMutation(CREATE_ROOM);
  // const translateSocketRef = useRef<Socket>()

  // useEffect(() => {
  //   // translateSocketRef.current = io("http://localhost:5000", { transports: ["websocket", "polling"] });

  //   return () => {
  //     // if (translateSocketRef.current) {
  //     //   translateSocketRef.current.disconnect();
  //     // }
  //   };
  // },[])

  function joinMeeting() {
    // if (translateSocketRef.current) {
    //   translateSocketRef.current.emit('translate', {
    //     "text": "The UN chief says there's no military solution in Syria.",
    //     "src_lang": "eng_Latn",
    //     "tgt_lang": "fra_Latn"
    //   }
    //   );
    //   translateSocketRef.current.on("translated", (data) => {
    //     console.log(data);
    //     speakText(data, "fr")
    //   })
    // }
    let code = code_or_link;

    if (code_or_link) {
      const codeIndex = code_or_link.lastIndexOf("/");
      if (codeIndex > 0) {
        code = code_or_link.substring(codeIndex + 1);
      }

      navigate(`${ROUTES.MEETING}${code}`);
    }
    console.log(code);
  }

  async function generateRoom() {
    const room = generateRoomId(); // Generate the room ID
    setIsMeetingActive(true); // Set meeting active state
    navigate(`${ROUTES.MEETING}${room}`);
  }

  function generateRoomId() {
    let counter = Math.floor(Math.random() * 16777216); // Initialize counter with random value
    const timestamp = Math.floor(new Date().getTime() / 1000);
    const machineIdentifier = Math.floor(Math.random() * 16777216)
      .toString(16)
      .padStart(6, "0");
    const processIdentifier = Math.floor(Math.random() * 65536)
      .toString(16)
      .padStart(4, "0");
    counter = (counter + 1) % 16777216; // Ensure the counter wraps around

    const counterBytes = counter.toString(16).padStart(6, "0"); // Ensure the counter is 3 bytes long
    return (
      timestamp.toString(16).padStart(8, "0") +
      machineIdentifier +
      processIdentifier +
      counterBytes
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        minWidth: "70vw",
        justifyContent: "center",
        my: 10,
        p: 4,
      }}
    >
      {!isMeetingActive ? (
        <Box sx={{ width: "600px", display: "flex", flexDirection: "column" }}>
          <Box sx={{ my: 1 }}>
            <Typography textAlign={"center"} level="h2">
              {t("welcome.vide_calls_for_all")}
            </Typography>
          </Box>
          <Box sx={{ my: 1 }}>
            <Typography textAlign={"center"}>
              {t("welcome.provide_vid_calls")}
            </Typography>
          </Box>

          <Grid
            container
            spacing={2}
            justifyContent="center"
            textAlign="center"
            sx={{ my: 1 }}
          >
            <Grid>
              <Input
                placeholder={t("welcome.enter_code_or_link")}
                onChange={(event) => setCode_or_link(event.target.value)}
              />
            </Grid>
            <Grid>
              <Button
                color="primary"
                variant="outlined"
                sx={{ cursor: "pointer" }}
                disabled={!code_or_link}
                onClick={joinMeeting}
              >
                {t("welcome.join")}
              </Button>
            </Grid>
          </Grid>

          <Divider>Or</Divider>

          <Grid
            container
            spacing={2}
            justifyContent="center"
            textAlign="center"
            sx={{ my: 1 }}
          >
            <Grid justifyContent="center" textAlign="center" sx={{ my: 1 }}>
              <Button
                color="primary"
                startDecorator={<VideoCallOutlined />}
                onClick={generateRoom}
              >
                {t("welcome.new_meeting")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Typography textAlign={"center"}>
          {t("welcome.starting_meeting")}
        </Typography>
      )}
    </Box>
  );
}

export default Welcome;

// const CREATE_ROOM = gql(`
// mutation Mutation {
//   createRoom
// }
// `);
