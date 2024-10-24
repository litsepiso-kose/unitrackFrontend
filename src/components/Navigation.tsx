import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import { useNavigate } from "react-router-dom";

import { t } from "i18next";
import { ROUTES } from "../helpers/common";
import {
  VideoCallOutlined,
  SupportOutlined,
} from "@mui/icons-material";
import { Avatar, Box, Divider, GlobalStyles, IconButton, Sheet, Typography } from "@mui/joy";
import { useUser } from "../redux/user-slice";

interface NavigationProps {
  isChatOpen: boolean;
}


export default function Navigation({ isChatOpen }: NavigationProps) {
  const navigate = useNavigate();
  const user = useUser();

  function closeSidebar(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '90dvh',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />

      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
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
                <ListItemButton selected onClick={() => navigate(ROUTES.UNIVERSITY)}>
                  <ListItemDecorator>
                    <SupportOutlined fontSize="small" />
                  </ListItemDecorator>
                  <ListItemContent>University</ListItemContent>
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton selected onClick={() => navigate(ROUTES.BURSARY)}>
                  <ListItemDecorator>
                    <SupportOutlined fontSize="small" />
                  </ListItemDecorator>
                  <ListItemContent>Bursary</ListItemContent>
                </ListItemButton>
              </ListItem>

            </List>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }} >
        <IconButton onClick={() => navigate(ROUTES.PROFILE)}>
          <Avatar
            variant="outlined"
            size="sm"
          />
        </IconButton>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="body-xs">
            {user.email}
          </Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral">
        </IconButton>
      </Box>
    </Sheet>
  );
}
