import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import { useNavigate } from "react-router-dom";

import { t } from "i18next";
import { ROUTES } from "../helpers/common";
import {
  SettingsOutlined,
  VideoCallOutlined,
  SupportOutlined,
} from "@mui/icons-material";

interface NavigationProps {
  isChatOpen: boolean;
}

export default function Navigation({ isChatOpen }: NavigationProps) {
  const navigate = useNavigate();

  return (
    <List
      size="sm"
      sx={{
        "--ListItem-radius": "var(--joy-radius-sm)",
        "--List-gap": "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        flexGrow: isChatOpen ? 1 : 0, 
        transition: "flex-grow 0.3s ease",
      }}
    >
      <ListItem nested>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            "& .JoyListItemButton-root": { p: "8px" },
          }}
        >
          <ListItem>
            <ListItemButton selected onClick={() => navigate(ROUTES.HOME)}>
              <ListItemDecorator>
                <VideoCallOutlined fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>{t("sidebar.home")}</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton selected onClick={() => navigate(ROUTES.SUPPORT)}>
              <ListItemDecorator>
                <SupportOutlined fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>{t("sidebar.support")}</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton selected onClick={() => navigate(ROUTES.SETTING)}>
              <ListItemDecorator>
                <SettingsOutlined fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>{t("sidebar.settings")}</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
}
