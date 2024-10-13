import { Box, Card, Divider, Grid, IconButton, Select, Typography } from "@mui/joy";
import { t } from "i18next";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Password from "../components/Password";
import ConfirmPassword from "../components/ConfirmPassword";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../helpers/common";
import { z } from "zod";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import { gql } from "@apollo/client";
import { SubmitLoadingButton } from "../components/SubmitLoadingButton";
import { Notice } from "../components/Notice";
import { SpeakerPhoneOutlined } from "@mui/icons-material";
import Option from '@mui/joy/Option';
import { playText } from "../hooks/useSpeechRecognition";
import { useUser } from "../redux/user-slice";
import { useVoices } from "../hooks/useVoices";
import i18n from "../helpers/i18n";

export default function Setting() {
  const navigate = useNavigate();
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const user = useUser()
  const voices = useVoices(i18n.language.split("-")[0])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const menuItems = [
    {
      label: t("settings.about_us"),
      icon: <ChevronRightIcon />,
      onClick: () => navigate(ROUTES.ABOUT_US),
    },
    {
      label: t("settings.privacy_policy"),
      icon: <ChevronRightIcon />,
      onClick: () => navigate(ROUTES.PRIVACY_POLICY),
    },
    {
      label: t("settings.terms_of_use"),
      icon: <ChevronRightIcon />,
      onClick: () => navigate(ROUTES.TERMS_OF_USE),
    },
  ];

  const [passwordUpdate] = useMutation(PASSWORDUPDATE);
  const [setUserLanguage] = useMutation(SETUSERLANGUAGE);

  function setLanguage(voiceLanguage: string | null) {
    if (voiceLanguage) {
      playText("Hi", voiceLanguage);
      setUserLanguage({ variables: { voiceLanguage } })
    }
  }

  const processForm: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      setIsLoading(true);

      const rtn = (await passwordUpdate({ variables: { ...data } })).data
        ?.passwordUpdate;

      if (rtn) {
        setIsSuccess(rtn);
        setMessages(["password updated."]);
      } else {
        setMessages(["password update failed"]);
      }
    } catch (error) {
      setMessages(["sign in failed"]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Box>
      <Typography component="h1" sx={{ fontSize: "2.5rem", mb: 1 }}>
        {t("sidebar.settings")}
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ flexGrow: 1 }}>
        <Grid xs={12} sm={12} md={6}>
          <Card variant="outlined" sx={{ maxWidth: "100%", gap: 1.5 }}>
            <Typography sx={{ fontSize: "lg", fontWeight: "md" }}>
              {t("settings.change_password")}
            </Typography>
            <Divider />
            <form onSubmit={handleSubmit(processForm)}>
              <Password
                showSubmitButton={showSubmitButton}
                error={errors.password}
                register={register}
              />
              <ConfirmPassword
                showSubmitButton={showSubmitButton}
                error={errors.confirm_password}
                register={register}
              />

              {messages.length === 0 && showSubmitButton && (
                <SubmitLoadingButton
                  isLoading={isLoading}
                  title={t("settings.save")}
                />
              )}

              {messages.length > 0 && (
                <Notice
                  isSuccess={isSuccess}
                  onClose={() => {
                    setShowSubmitButton(true);
                    setMessages([]);
                  }}
                  messages={messages}
                />
              )}
            </form>
          </Card>
        </Grid>

        <Grid xs={12} sm={12} md={6}>
          <Card variant="outlined" sx={{ maxWidth: "100%", gap: 1.5 }}>
            <Typography sx={{ fontSize: "lg", fontWeight: "md" }}>
              {t("settings.chooseVoiceOver")}
            </Typography>
            <Divider />
            <Select defaultValue={user.voiceLanguage} placeholder={t("settings.select")} startDecorator={<SpeakerPhoneOutlined />}
              onChange={(
                _: React.SyntheticEvent | null,
                newValue: string | null,
              ) => {
                setLanguage(newValue);
              }}      >
              {voices.map((voice, index) => (
                <Option key={index} value={voice.lang}> {`${voice.name} (${voice.lang})`}</Option>
              ))}
            </Select>
          </Card>
        </Grid>
      </Grid>

      <Card variant="outlined" sx={{ maxWidth: "100%", gap: 1.5, my: 2 }}>
        <Typography component="h6" sx={{ fontSize: "1.5rem" }}>
          {t("settings.More")}
        </Typography>
        <Divider />
        {menuItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              mb: 1,
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              width: "100%",
              maxWidth: 400,
            }}
          >
            <Typography sx={{ mb: 0 }}>
              <span onClick={item.onClick} style={{ cursor: "pointer" }}>
                {item.label}
              </span>
            </Typography>
            <IconButton onClick={item.onClick}>{item.icon}</IconButton>
          </Box>
        ))}
      </Card>
    </Box>
  );

}

const PASSWORDUPDATE = gql(`
mutation PasswordUpdate($password: String!) {
  passwordUpdate(password: $password)
}
`);

export const SETUSERLANGUAGE = gql(`
 mutation SetUserLanguage($voiceLanguage: String!) {
  setUserLanguage(voiceLanguage: $voiceLanguage)
}
  `);

export const FormSchema = z
  .object({
    password: z
      .string({})
      .min(1, "this is required")
      .min(8, "Not shorter than 8")
      .max(100, "This must be less than 100 characters long"),
    confirm_password: z
      .string({})
      .min(1, "this is required")
      .min(8, "Not shorter than 8")
      .max(100, "This must be less than 100 characters long"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type FormSchemaType = z.infer<typeof FormSchema>;
