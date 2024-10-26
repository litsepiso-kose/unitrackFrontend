import { Box, Card, CircularProgress, Stack, Typography } from "@mui/joy"
import TextField from "../../components/TextField"
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Notice } from "../../components/Notice";
import { SubmitLoadingButton } from "../../components/SubmitLoadingButton";
import FTextarea from "../../components/TextArea";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom';

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

// const _SaveApplication = gql`
// mutation SaveApplication($input: ApplicationInput!) {
//   saveApplication(input: $input) {
//     messages
//     succeeded
//   }
// }
// `
const defaultValues = {
    name: "Future Leaders Bursary",
    description: "A bursary aimed at supporting high-performing students from underprivileged backgrounds.",
    deadline: "2024-11-30", // Example in YYYY-MM-DD format
    url: "https://futureleadersbursary.org/apply"
};

// const _GetApplication = gql`
// query GetApplication($getApplicationId: String!) {
//   getApplication(id: $getApplicationId) {
//     id
//     name
//     description
//     url
//     typeId
//     deadline
//     status
//     type
//     messages
//     succeeded
//   }
// }`

type FormSchemaType = z.infer<typeof FormSchema>;

function BursaryApply() {
    const { id } = useParams();
    const [showSubmitButton, setShowSubmitButton] = useState(true);
    const [messages, setMessages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const onError = (errors: any) => {
        console.log("React Hook Form Errors:", errors);
    };

    // const [saveApplication] = useMutation(_SaveApplication);
    // const { data, error, loading } = useQuery<GetApplicationQuery>(_GetApplication, {
    //     variables: { getApplicationId: id },
    //     skip: !id // Skip the query if `id` is not provided
    // });

    const processForm: SubmitHandler<FormSchemaType> = async (input) => {
        console.log(input);
        // setIsLoading(true);

        // try {
        //     const response = await saveApplication({ variables: { input: { ...input, type: 0, id } } });
        //     setShowSubmitButton(false);
        //     setMessages(response.data.saveApplication.messages);
        //     setIsSuccess(response.data.saveApplication.succeeded);
        // } catch (error) {
        //     setMessages((prevMessages) => [
        //         ...(prevMessages || []),
        //         "Submission failed."
        //     ]);
        //     console.error("Sign-up error:", error);
        // } finally {
        //     setIsLoading(false);
        // }
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
        defaultValues: !import.meta.env.DEV ? defaultValues : {}
    });

    // // // Handle error and loading states from `useQuery`
    // // if (error) {
    // //     return (
    // //         <Notice
    // //             onClose={() => { window.location.href = '/' }}
    // //             messages={["An error happened on the server."]}
    // //         />
    // //     );
    // // }

    // // if (loading) return <CircularProgress />;

    // // Populate form fields with data if `id` is provided and query succeeded
    // useEffect(() => {
    //     if (id && data?.getApplication?.succeeded) {
    //         Object.keys(data.getApplication).forEach((key) => {
    //             setValue(key as keyof FormSchemaType, (data.getApplication as any)[key as keyof FormSchemaType]);
    //         });
    //     }
    // }, [data, id, setValue]);

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Typography level="h3" component="h2" sx={{ mt: 1, mb: 2 }}>
                {id ? "Edit your application below" : " Submit a bursary application"}
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