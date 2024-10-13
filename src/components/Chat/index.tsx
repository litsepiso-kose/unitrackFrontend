import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Input,
  IconButton,
  Divider,
  Tooltip,
  Badge,
  Grid,
} from "@mui/joy";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import { Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useUser } from "../../redux/user-slice";
import { ColorSchemeToggle } from "../ColorSchemeToggle";
//import ColorSchemeToggle from "../common/ColorSchemeToggle"; // Import ColorSchemeToggle

interface Message {
  user: string;
  text: string;
  time: string;
}

interface ChatProps {
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
  socket: Socket | null;
}

const Chat: React.FC<ChatProps> = ({ isChatOpen, setIsChatOpen, socket }) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [message, setMessage] = React.useState<string>("");
  const messageRef = React.useRef<HTMLDivElement>(null);
  const { roomId } = useParams();
  const [messageCount, setMessageCount] = useState(0);
  //const UserName = useUser();
  const UserDisplayName = useUser().email ?? "Me";

  const notificationSound = React.useMemo(() => {
    return new Audio("/NotificationSound/notification.mp3");
  }, []);
  notificationSound.volume = 1.0;

  useEffect(() => {
    if (!socket) {
      return;
    }
    if (roomId) {
      socket.emit("joinRoom", roomId);
    }

    socket.on("receiveMessage", (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data);

      if (!isChatOpen) {
        setMessageCount((prevCount) => prevCount + 1);
        notificationSound.play().catch((error) => {
          console.error("Failed to play sound:", error);
        });
      }
    });

    return () => {
      if (socket) {
        socket.off("receiveMessage");
      }
    };
  }, [roomId, socket, isChatOpen, notificationSound]);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
  };

  const sendMessage = () => {
    if (message.trim()) {
      const time = getCurrentTime();
      if (!socket) {
        return;
      }

      socket.emit("sendMessage", {
        roomId,
        user: UserDisplayName,
        text: message,
        time,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { user: UserDisplayName , text: message, time },
      ]);

      setMessage("");
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const handleIconButtonClick = () => {
    setIsChatOpen(!isChatOpen);

    if (!isChatOpen) {
      setMessageCount(0);
    }
  };

  return (
    <Grid container spacing={2} sx={{ height: "100vh" }}>
      <Badge
        badgeContent={messageCount}
        color="primary"
        sx={{
          position: "fixed",
          bottom: 20,
          right: isChatOpen ? 10 : 20,
          "& .MuiBadge-badge": {
            bgcolor: "#FF5722",
            color: "#FFF",
          },
          transition: "transform 0.1s",
          "&:hover": { transform: "scale(1.02)" },
        }}
      >
        <IconButton
          color="neutral"
          onClick={handleIconButtonClick}
          sx={{
            bgcolor: "#4A4A4A",
            boxShadow: "md",
            transition: "transform 0.1s",
            "&:hover": {
              bgcolor: "#6D6D6D",
              transform: "scale(1.02)",
            },
          }}
        >
          <ChatIcon sx={{ color: "#FFF" }} />
        </IconButton>
      </Badge>

      {isChatOpen && (
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 360,
            height: "80vh",
            position: "fixed",
            bottom: 70,
            right: 10,
            bgcolor: "#FFFFFF",
            borderRadius: "lg",
            transition: "transform 0.1s",
            "&:hover": { transform: "scale(1.02)" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
              borderBottom: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          >
            <Typography
              level="h3"
              sx={{
                textAlign: "center",
                color: "#000000",
              }}
            >
              Live Chat
            </Typography>

            <ColorSchemeToggle />
          </Box>

          <Typography
            sx={{
              padding: "10px",
              borderBottom: "1px solid",
              borderColor: "divider",
              textAlign: "center",
              color: "#000000",
            }}
          >
            All messages are deleted when the call ends
          </Typography>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              padding: "5px",
              bgcolor: "#FFFFFF",
              margin: "5px",
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  padding: "12px 18px",
                  marginBottom: "12px",
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "1rem",
                      color: "#000000",
                    }}
                  >
                    {msg.user}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.65rem",
                      color: "#000000",
                      textAlign: "right",
                    }}
                  >
                    {msg.time}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    color: "#34495E",
                    fontSize: "0.95rem",
                    lineHeight: "1.4",
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
            <div ref={messageRef}></div>
          </Box>

          <Divider />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "16px",
            }}
          >
            <Input
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                flex: 1,
                bgcolor: "#FFFFFF",
                marginRight: "8px",
                color: "#000000",
              }}
            />
            <Tooltip title="Send" placement="top">
              <IconButton
                onClick={sendMessage}
                variant="solid"
                sx={{
                  bgcolor: "#4A4A4A",
                  "&:hover": {
                    bgcolor: "#6D6D6D",
                  },
                  color: "#FFF",
                }}
              >
                <SendIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Card>
      )}
    </Grid>
  );
};

export default Chat;
