import { AspectRatio, Avatar, Box, Card, Divider, FormLabel, Grid, Stack, Typography } from "@mui/joy"
import TextField from "../../components/TextField"
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Notice } from "../../components/Notice";
import { SubmitLoadingButton } from "../../components/SubmitLoadingButton";
import FTextarea from "../../components/TextArea";

const FormSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .max(100, "Name must be less than 100 characters"),

    description: z
        .string()
        .min(1, "Description is required")
        .max(255, "Description must be less than 255 characters"),

    deadline: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Deadline must be in YYYY-MM-DD format")
        .optional(), // If it's not mandatory

    url: z
        .string()
        .url("Must be a valid URL")
        .optional(), // If it's not mandatory
});

const defaultValues = {
    name: "Future Leaders Bursary",
    description: "A bursary aimed at supporting high-performing students from underprivileged backgrounds.",
    deadline: "2024-11-30", // Example in YYYY-MM-DD format
    url: "https://futureleadersbursary.org/apply"
};

type FormSchemaType = z.infer<typeof FormSchema>;

function BursaryApply() {
    const [showSubmitButton, setShowSubmitButton] = useState(true);
    const [messages, setMessages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, setValue,
    } = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
        defaultValues: import.meta.env.DEV ? defaultValues : {}
    });

    const onError = (errors: any) => {
        console.log("React Hook Form Errors:", errors);  // Logs all validation errors
    };

    const processForm: SubmitHandler<FormSchemaType> = async (_input) => {
        console.log(_input)
        // setIsLoading(true);

        // try {
        //   const input = { ..._input }
        //   const response = await saveCredential({ variables: { input } });

        //   setShowSubmitButton(false);
        //   setMessages(response.data.saveCredential.messages)
        //   setIsSuccess(true);
        // } catch (error) {
        //   setMessages(["Sign up failed. Please try again later."]);
        //   console.error("Sign-up error:", error);
        // } finally {
        //   setIsLoading(false);
        // }
    };

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Typography level="h3" component="h2" sx={{ mt: 1, mb: 2 }}>
                Submit a bursary application
            </Typography>
            <Stack spacing={4} sx={{ display: 'flex', mx: 'auto', }}           >
                <form onSubmit={handleSubmit(processForm, onError)}>
                    <Card>
                        <TextField disabled={Boolean(!showSubmitButton)} label={"Bursary name"} fieldName="name" placeholder="name"
                            register={register} fieldError={errors.name} type="text"></TextField>

                        <FTextarea disabled={Boolean(!showSubmitButton)} label={"Description"} fieldName="description"
                            placeholder="Description" register={register} fieldError={errors.description} type="text"></FTextarea>

                        <TextField disabled={Boolean(!showSubmitButton)} label={"Deadline"} fieldName="deadline"
                            placeholder="YYYY-MM-DD" register={register} fieldError={errors.deadline} type="date"
                        />
                        <TextField disabled={Boolean(!showSubmitButton)} label={"URL"} fieldName="url"
                            placeholder="https://example.com" register={register} fieldError={errors.url} type="url"
                        />
                    </Card>

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
    )
}

export default BursaryApply