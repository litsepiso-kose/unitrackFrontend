import * as React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Avatar from "@mui/joy/Avatar";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import ListDivider from "@mui/joy/ListDivider";
import Drawer from "@mui/joy/Drawer";
import ModalClose from "@mui/joy/ModalClose";
import DialogTitle from "@mui/joy/DialogTitle";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SideBarNavigation from "./Navigation";
import { PublicOutlined, TranslateOutlined } from "@mui/icons-material";
import { APP_NAME, ROUTES } from "../helpers/common";
import { signOut, useUser } from "../redux/user-slice";
import { useAppDispatch } from "../redux/hooks";
import { ColorSchemeToggle } from "./ColorSchemeToggle";
import { Language, languages } from "../helpers/i18n";
import { updateLanguage } from "../redux/meeting-slice";
import { ListItemContent } from "@mui/joy";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const user = useUser();
  const navigate = useNavigate();

  function logout() {
    dispatch(signOut());
  }

  function changeLanguage(l: Language) {
    dispatch(updateLanguage(l.script));
  }

  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <Logo />
        <LeftHeaderNavigation />
      </Stack>
      <Box sx={{ display: { xs: "inline-flex", sm: "none" } }}>
        <IconButton
          variant="plain"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Drawer
          sx={{ display: { xs: "inline-flex", sm: "none" } }}
          open={open}
          onClose={() => setOpen(false)}
        >
          <ModalClose />
          <DialogTitle>{APP_NAME}</DialogTitle>
          <Box sx={{ px: 1 }}>
            <SideBarNavigation isChatOpen={false} />
          </Box>
        </Drawer>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1.5,
          alignItems: "center",
        }}
      >
        <ColorSchemeToggle />
        <Dropdown>
          <MenuButton
            variant="plain"
            size="sm"
            sx={{
              maxWidth: "32px",
              maxHeight: "32px",
              borderRadius: "9999999px",
            }}
          >
            <TranslateOutlined />
          </MenuButton>
          <Menu
            placement="bottom-end"
            size="sm"
            sx={{
              zIndex: "99999",
              p: 1,
              gap: 1,
              "--ListItem-radius": "var(--joy-radius-sm)",
            }}
          >
            {languages.map((l, i) => (
              <MenuItem
                onClick={() => {}}
                key={i}
                onClickCapture={() => changeLanguage(l)}
              >
                <PublicOutlined />
                {l.label}
              </MenuItem>
            ))}
          </Menu>
        </Dropdown>
        <Dropdown>
          <MenuButton
            variant="plain"
            size="sm"
            sx={{
              maxWidth: "32px",
              maxHeight: "32px",
              borderRadius: "9999999px",
            }}
          >
            <Avatar
               sx={{ maxWidth: "32px", maxHeight: "32px" }}
            />
          </MenuButton>
          <Menu
            placement="bottom-end"
            size="sm"
            sx={{
              zIndex: "99999",
              p: 1,
              gap: 1,
              "--ListItem-radius": "var(--joy-radius-sm)",
            }}
          >
            <MenuItem onClick={()=>navigate(ROUTES.PROFILE)}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                   sx={{ borderRadius: "50%" }}
                />
                <Box sx={{ ml: 1.5 }}>
                  <Typography level="title-sm" textColor="text.primary">
                    {user.email}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            <ListDivider />
            <MenuItem onClick={() => navigate(ROUTES.SUPPORT)}>
              <HelpRoundedIcon />
              <ListItemContent>{t("auth.help")}</ListItemContent>
            </MenuItem>
            <MenuItem onClick={() => navigate(ROUTES.SETTING)}>
              <SettingsRoundedIcon />
              <ListItemContent>{t("sidebar.settings")}</ListItemContent>
            </MenuItem>

            <ListDivider />
            <MenuItem onClick={() => navigate(ROUTES.ABOUT_US)}>
              <ListItemContent>{t("settings.about_us")}</ListItemContent>
              <OpenInNewRoundedIcon />
            </MenuItem>
            <MenuItem onClick={() => navigate(ROUTES.TERMS_OF_USE)}>
              <ListItemContent>{t("auth.terms_of_use")}</ListItemContent>
              <OpenInNewRoundedIcon />
            </MenuItem>
            <MenuItem onClick={() => navigate(ROUTES.PRIVACY_POLICY)}>
              <ListItemContent>{t("auth.privacy_policy")}</ListItemContent>
              <OpenInNewRoundedIcon />
            </MenuItem>

            <ListDivider />
            <MenuItem onClick={logout}>
              <LogoutRoundedIcon />
              <ListItemContent>{t("auth.log_out")}</ListItemContent>
            </MenuItem>
          </Menu>
        </Dropdown>
      </Box>
    </Box>
  );
}

function Logo() {
  return (
    <IconButton
      size="md"
      variant="outlined"
      color="neutral"
      sx={{
        p: 2,
        display: { xs: "none", sm: "inline-flex" },
        borderRadius: "50%",
      }}
    >
      {APP_NAME} <LanguageRoundedIcon />
    </IconButton>
  );
}

export function LeftHeaderNavigation() {
  return (
    <div>
      {/* <Button
      variant="plain"
      color="neutral"
      component="a"
      href="/joy-ui/getting-started/templates/email/"
      size="sm"
      sx={{ alignSelf: 'center' }}
    >
      Email
    </Button>
    <Button
      variant="plain"
      color="neutral"
      aria-pressed="true"
      component="a"
      href="/joy-ui/getting-started/templates/team/"
      size="sm"
      sx={{ alignSelf: 'center' }}
    >
      Team
    </Button>
    <Button
      variant="plain"
      color="neutral"
      component="a"
      href="/joy-ui/getting-started/templates/files/"
      size="sm"
      sx={{ alignSelf: 'center' }}
    >
      Files
    </Button> */}
    </div>
  );
}
