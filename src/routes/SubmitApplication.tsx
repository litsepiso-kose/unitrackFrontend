import Box from "@mui/joy/Box";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sheet, Typography } from "@mui/joy";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { Notice } from "../components/Notice";
import { SubmitLoadingButton } from "../components/SubmitLoadingButton";
import { gql, useMutation } from "@apollo/client";
import { t } from "i18next";
import TextField from "../components/TextField";

const _SaveCredential = gql` 
mutation SaveCredential($input: CredentialInput!) {
  saveCredential(input: $input) {
    userId
    name
    surname
    dob
    idNumber
    nationality
    gender
    home_language
    resAddress
    postAddress
    phoneNumber
    parentOrGuardian
    messages
  }
}
`;

export const FormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),

  surname: z
    .string()
    .min(1, "Surname is required")
    .max(100, "Surname must be less than 100 characters"),

  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of Birth must be in YYYY-MM-DD format"),

  idNumber: z
    .string()
    .min(6, "ID Number must be at least 6 characters")
    .max(20, "ID Number must be less than 20 characters"),

  nationality: z
    .string()
    .min(1, "Nationality is required")
    .max(100, "Nationality must be less than 100 characters"),

  gender: z
    .string()
    .min(1, "Gender is required")
    .max(20, "Gender must be less than 20 characters"),

  home_language: z
    .string()
    .min(1, "Home language is required")
    .max(100, "Home language must be less than 100 characters"),

  resAddress: z
    .string()
    .min(1, "Residential Address is required")
    .max(255, "Residential Address must be less than 255 characters"),

  postAddress: z
    .string()
    .min(1, "Postal Address is required")
    .max(255, "Postal Address must be less than 255 characters"),

  phoneNumber: z
    .string()
    .min(10, "Phone Number must be at least 10 digits")
    .max(15, "Phone Number must be less than 15 digits")
    .regex(/^\d+$/, "Phone Number must be numeric"),

  parentOrGuardian: z
    .string()
    .min(1, "Parent or Guardian is required")
    .max(100, "Parent or Guardian must be less than 100 characters"),
});


type FormSchemaType = z.infer<typeof FormSchema>;

export default function Page() {
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [messages, setMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [saveCredential] = useMutation(_SaveCredential);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "John",
      surname: "Doe",
      dob: "1990-01-01",
      idNumber: "1234567890123",
      nationality: "South African",
      gender: "Male",
      home_language: "English",
      resAddress: "123 Street Name, City, Country",
      postAddress: "P.O. Box 123, City, Country",
      phoneNumber: "1234567890",
      parentOrGuardian: "Jane Doe",
    },
  });


  const processForm: SubmitHandler<FormSchemaType> = async (_input) => {
    console.log(_input)
    setIsLoading(true);

    try {
      const input = { userId: "testId", ..._input }
      const response = await saveCredential({ variables: { input } });

      setShowSubmitButton(false);
      setMessages(response.data.saveCredential.messages)
      setIsSuccess(true);
    } catch (error) {
      setMessages(["Sign up failed. Please try again later."]);
      console.error("Sign-up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <Sheet
      sx={{
        width: "100%",
        p: 3,
        borderRadius: "sm",
        boxShadow: "md",
      }}
    >
      <form onSubmit={handleSubmit(processForm)}>
        <Box sx={{ display: "grid", placeItems: "center", mb: 3 }}>

          <Typography
            level="h2"
            component="h1"
            sx={{ mb: 1, textAlign: "center" }}
          >
            <b>{t("welcome.submit_application")}</b>
          </Typography>

        </Box>
        <TextField
          disabled={Boolean(!showSubmitButton)}
          label={"Surname"}
          fieldName="surname"
          placeholder="Doe"
          register={register}
          fieldError={errors.surname}
          type="text"
        ></TextField>

        <TextField
          disabled={Boolean(!showSubmitButton)}
          label={"Date of Birth"}
          fieldName="dob"
          placeholder="YYYY-MM-DD"
          register={register}
          fieldError={errors.dob}
          type="date"
        ></TextField>

        <TextField
          disabled={Boolean(!showSubmitButton)}
          label={"ID Number"}
          fieldName="idNumber"
          placeholder="1234567890"
          register={register}
          fieldError={errors.idNumber}
          type="text"
        ></TextField>

        <TextField
          disabled={Boolean(!showSubmitButton)}
          label={"Nationality"}
          fieldName="nationality"
          placeholder="South African"
          register={register}
          fieldError={errors.nationality}
          type="text"
        ></TextField>

        <TextField
          disabled={Boolean(!showSubmitButton)}
          label={"Gender"}
          fieldName="gender"
          placeholder="Male/Female/Other"
          register={register}
          fieldError={errors.gender}
          type="text"
        ></TextField>

        <TextField
          disabled={Boolean(!showSubmitButton)}
          label={"Home Language"}
          fieldName="home_language"
          placeholder="English"
          register={register}
          fieldError={errors.home_language}
          type="text"
        ></TextField>

        <TextField
          disabled={Boolean(!showSubmitButton)}
          label={"Residential Address"}
          fieldName="resAddress"
          placeholder="123 Street, City"
          register={register}
          fieldError={errors.resAddress}
          type="text"
        ></TextField>

        <TextField
          disabled={Boolean(!showSubmitButton)}
          label={"Postal Address"}
          fieldName="postAddress"
          placeholder="P.O. Box 456"
          register={register}
          fieldError={errors.postAddress}
          type="text"
        ></TextField>

        <TextField
          disabled={Boolean(!showSubmitButton)}
          label={"Phone Number"}
          fieldName="phoneNumber"
          placeholder="1234567890"
          register={register}
          fieldError={errors.phoneNumber}
          type="tel"
        ></TextField>

        <TextField
          disabled={Boolean(!showSubmitButton)}
          label={"Parent or Guardian"}
          fieldName="parentOrGuardian"
          placeholder="John Doe"
          register={register}
          fieldError={errors.parentOrGuardian}
          type="text"
        ></TextField>


        {showSubmitButton && (
          <SubmitLoadingButton
            isLoading={isLoading}
            title={t("submit_application.submit")}
          />
        )}

        {!showSubmitButton && messages.length > 0 && (
          <Notice
            isSuccess={isSuccess}
            onClose={() => {
              setShowSubmitButton(true);
              setMessages([]);
              reset();
            }}
            messages={messages}
          />
        )}
      </form>
    </Sheet>
  );
}
