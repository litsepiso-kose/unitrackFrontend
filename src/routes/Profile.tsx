import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

import { Avatar, Grid } from '@mui/joy';
import TextField from '../components/TextField';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitLoadingButton } from '../components/SubmitLoadingButton';
import { Notice } from '../components/Notice';
import { gql, useMutation } from '@apollo/client';

const FormSchema = z.object({
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

  idNumberOrPassport: z
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

  homeLanguage: z
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

  emailAddress: z
    .string()
    .email("Email Address must be valid"),

  phoneNumber: z
    .string()
    .min(10, "Phone Number must be at least 10 digits")
    .max(15, "Phone Number must be less than 15 digits")
    .regex(/^\d+$/, "Phone Number must be numeric"),

  parentOrGuardian: z
    .string()
    .min(1, "Parent or Guardian is required")
    .max(100, "Parent or Guardian must be less than 100 characters"),

  parentOrGuardianPhoneNumber: z
    .string()
    .min(10, "Parent or Guardian Phone Number must be at least 10 digits")
    .max(15, "Parent or Guardian Phone Number must be less than 15 digits")
    .regex(/^\d+$/, "Phone Number must be numeric"),

  parentOrGuardianEmail: z
    .string()
    .email("Parent or Guardian Email must be valid"),

  parentOrGuardianOccupation: z
    .string()
    .min(1, "Parent or Guardian Occupation is required")
    .max(100, "Parent or Guardian Occupation must be less than 100 characters"),

  parentOrGuardianWorkPhoneNumber: z
    .string()
    .min(10, "Parent or Guardian Work Phone Number must be at least 10 digits")
    .max(15, "Parent or Guardian Work Phone Number must be less than 15 digits")
    .regex(/^\d+$/, "Work Phone Number must be numeric"),

  parentOrGuardianWorkAddress: z
    .string()
    .min(1, "Parent or Guardian Work Address is required")
    .max(255, "Parent or Guardian Work Address must be less than 255 characters"),

  parentOrGuardianHouseholdIncome: z
    .string()
    .min(1, "Household Income is required")
    .max(100, "Household Income must be less than 100 characters"),

  schoolName: z
    .string()
    .min(1, "School Name is required")
    .max(255, "School Name must be less than 255 characters"),

  examinationBoard: z
    .string()
    .min(1, "Examination Board is required")
    .max(255, "Examination Board must be less than 255 characters"),

  grade12Results: z
    .string()
    .min(1, "Grade 12 Results are required")
    .max(255, "Grade 12 Results must be less than 255 characters"),

  grade11Results: z
    .string()
    .min(1, "Grade 11 Results are required")
    .max(255, "Grade 11 Results must be less than 255 characters"),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const _SaveCredential = gql` 
mutation SaveCredential($input: CredentialInput!) {
  saveCredential(input: $input) {

    messages
  }
}
`;

export default function MyProfile() {
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [messages, setMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const defaultValues: FormSchemaType = {
    emailAddress: "ppp@ddd.com",
    name: "John",
    surname: "Doe",
    dob: "1990-01-01",
    idNumberOrPassport: "1234567890123",
    nationality: "South African",
    gender: "Male",
    homeLanguage: "English",  // Updated to match the Zod schema field
    resAddress: "123 Street Name, City, Country",
    postAddress: "P.O. Box 123, City, Country",
    phoneNumber: "1234567890",
    parentOrGuardian: "Jane Doe",
    parentOrGuardianPhoneNumber: "0987654321",
    parentOrGuardianEmail: "jane.doe@example.com",
    parentOrGuardianOccupation: "Teacher",
    parentOrGuardianWorkPhoneNumber: "0987654322",
    parentOrGuardianWorkAddress: "456 Avenue Name, City, Country",
    parentOrGuardianHouseholdIncome: "50000",
    schoolName: "High School Example",
    examinationBoard: "National Examination Board",
    grade12Results: "A",
    grade11Results: "B",
  };

  const onError = (errors: any) => {
    console.log("React Hook Form Errors:", errors);  // Logs all validation errors
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: import.meta.env.DEV ? defaultValues : {}
  });

  const [saveCredential] = useMutation(_SaveCredential);

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
    <Box sx={{ flex: 1, width: '100%' }}>
      <Box
        sx={{
          position: 'sticky',
          top: { sm: -100, md: -110 },
          bgcolor: 'background.body',
          zIndex: 9995,
        }}
      >
        <Box  >
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            My profile
          </Typography>
        </Box>

      </Box>
      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          mx: 'auto',
        }}
      >
        <form onSubmit={handleSubmit(processForm, onError)}>
          <Grid container spacing={{ xs: 2, md: 3 }} sx={{ flexGrow: 1 }}>
            <Grid xs={12} sm={12} md={6}>
              <Card>
                <Box sx={{ mb: 1 }}>
                  <Typography level="title-md">Personal info</Typography>
                  <Typography level="body-sm">
                    Customize how your profile information will appear to the networks.
                  </Typography>
                </Box>
                <Divider />
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                >
                  <Stack direction="column" spacing={1}>
                    <AspectRatio
                      ratio="1"
                      maxHeight={200}
                      sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
                    >
                      <Avatar />
                    </AspectRatio>
                  </Stack>
                  <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    <Stack spacing={1}>
                      <FormLabel>Names</FormLabel>
                      <TextField disabled={Boolean(!showSubmitButton)} label={""} fieldName="name" placeholder="name"
                        register={register} fieldError={errors.name} type="text"></TextField>
                      <TextField disabled={Boolean(!showSubmitButton)} label={""} fieldName="surname"
                        placeholder="surname" register={register} fieldError={errors.surname} type="text"></TextField>
                      <TextField
                        disabled={Boolean(!showSubmitButton)} label="Email Address" fieldName="emailAddress" placeholder="example@email.com"
                        register={register} fieldError={errors.emailAddress} type="email"
                      />
                      {errors.emailAddress && <p>{errors.emailAddress.message}</p>}
                      <TextField disabled={Boolean(!showSubmitButton)} label={"Date of birth"} fieldName="dob"
                        placeholder="date of birth" register={register} fieldError={errors.dob} type="date"></TextField>
                      <TextField disabled={Boolean(!showSubmitButton)} label={"ID Number/Passport"} fieldName="idNumberOrPassport" placeholder="1234567890"
                        register={register} fieldError={errors.idNumberOrPassport} type="text"                ></TextField>
                      <TextField disabled={Boolean(!showSubmitButton)} label={"Nationality"} fieldName="nationality"
                        placeholder="South African" register={register} fieldError={errors.nationality} type="text"                ></TextField>

                      <TextField disabled={Boolean(!showSubmitButton)} label={"Gender"} fieldName="gender"
                        placeholder="Male/Female/Other" register={register} fieldError={errors.gender} type="text"
                      ></TextField>
                      <TextField disabled={Boolean(!showSubmitButton)} label={"Home Language"} fieldName="homeLanguage"
                        placeholder="English" register={register} fieldError={errors.homeLanguage} type="text"
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Card> </Grid>
            <Grid xs={12} sm={12} md={6}>
              <Card>
                <Box sx={{ mb: 1 }}>
                  <Typography level="title-md">Contact info</Typography>
                </Box>
                <Divider />
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                >
                  <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    <Stack spacing={1}>
                      <TextField disabled={Boolean(!showSubmitButton)} label={"Residential Address"} fieldName="resAddress"
                        placeholder="123 Street, City" register={register} fieldError={errors.resAddress} type="text"
                      ></TextField>

                      <TextField disabled={Boolean(!showSubmitButton)} label={"Postal Address"} fieldName="postAddress"
                        placeholder="P.O. Box 456" register={register} fieldError={errors.postAddress} type="text"
                      ></TextField>

                      <TextField disabled={Boolean(!showSubmitButton)} label={"Phone Number"} fieldName="phoneNumber"
                        placeholder="1234567890" register={register} fieldError={errors.phoneNumber} type="tel"
                      ></TextField>
                    </Stack>
                  </Stack>
                </Stack>
              </Card> </Grid>
            <Grid xs={12} sm={12} md={6}>
              <Card>
                <Box sx={{ mb: 1 }}>
                  <Typography level="title-md">Parent/Guardian info</Typography>
                </Box>
                <Divider />
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                >
                  <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    <Stack spacing={1}>
                      <TextField
                        disabled={Boolean(!showSubmitButton)}
                        label="Parent or Guardian Name"
                        fieldName="parentOrGuardian"
                        placeholder="John Doe"
                        register={register}
                        fieldError={errors.parentOrGuardian}
                        type="text"
                      />
                      <TextField
                        disabled={Boolean(!showSubmitButton)}
                        label="Parent or Guardian Phone Number"
                        fieldName="parentOrGuardianPhoneNumber"
                        placeholder="1234567890"
                        register={register}
                        fieldError={errors.parentOrGuardianPhoneNumber}
                        type="text"
                      />
                      <TextField
                        disabled={Boolean(!showSubmitButton)}
                        label="Parent or Guardian Email"
                        fieldName="parentOrGuardianEmail"
                        placeholder="example@email.com"
                        register={register}
                        fieldError={errors.parentOrGuardianEmail}
                        type="email"
                      />
                      <TextField
                        disabled={Boolean(!showSubmitButton)}
                        label="Parent or Guardian Occupation"
                        fieldName="parentOrGuardianOccupation"
                        placeholder="Occupation"
                        register={register}
                        fieldError={errors.parentOrGuardianOccupation}
                        type="text"
                      />
                      <TextField
                        disabled={Boolean(!showSubmitButton)}
                        label="Parent or Guardian Work Phone Number"
                        fieldName="parentOrGuardianWorkPhoneNumber"
                        placeholder="0987654322"
                        register={register}
                        fieldError={errors.parentOrGuardianWorkPhoneNumber}
                        type="text"
                      />
                      <TextField
                        disabled={Boolean(!showSubmitButton)}
                        label="Parent or Guardian Work Address"
                        fieldName="parentOrGuardianWorkAddress"
                        placeholder="456 Avenue Name, City, Country"
                        register={register}
                        fieldError={errors.parentOrGuardianWorkAddress}
                        type="text"
                      />
                      <TextField
                        disabled={Boolean(!showSubmitButton)}
                        label="Household Income"
                        fieldName="parentOrGuardianHouseholdIncome"
                        placeholder="50000"
                        register={register}
                        fieldError={errors.parentOrGuardianHouseholdIncome}
                        type="text"
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <Card>
                <Box sx={{ mb: 1 }}>
                  <Typography level="title-md">Scholar info</Typography>
                </Box>
                <Divider />
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                >
                  <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    <Stack spacing={1}>
                      <TextField
                        disabled={Boolean(!showSubmitButton)}
                        label="School Name"
                        fieldName="schoolName"
                        placeholder="High School Example"
                        register={register}
                        fieldError={errors.schoolName}
                        type="text"
                      />
                      <TextField
                        disabled={Boolean(!showSubmitButton)}
                        label="Examination Board"
                        fieldName="examinationBoard"
                        placeholder="National Examination Board"
                        register={register}
                        fieldError={errors.examinationBoard}
                        type="text"
                      />
                      <TextField
                        disabled={Boolean(!showSubmitButton)}
                        label="Grade 12 Results"
                        fieldName="grade12Results"
                        placeholder="A"
                        register={register}
                        fieldError={errors.grade12Results}
                        type="text"
                      />
                      <TextField
                        disabled={Boolean(!showSubmitButton)}
                        label="Grade 11 Results"
                        fieldName="grade11Results"
                        placeholder="B"
                        register={register}
                        fieldError={errors.grade11Results}
                        type="text"
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          </Grid>

          {showSubmitButton && (
            <SubmitLoadingButton
              isLoading={isLoading}
              title={'Save'}
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
      </Stack>
    </Box>
  );
}