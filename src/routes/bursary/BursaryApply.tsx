import Option from '@mui/joy/Option';
import { Box, Card, CircularProgress, FormLabel, Select, Stack, Typography } from "@mui/joy"
import TextField from "../../components/TextField"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Notice } from "../../components/Notice";
import FTextarea from "../../components/TextArea";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from 'react-router-dom';
import { GetApplicationByIdQuery } from "../../__generated__/graphql";
import { ApplicationStatus } from '../../helpers/common';

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

    applyLink: z
        .string()
        .url("Must be a valid URL")
        .optional(), // If it's not mandatory
});


const _UpdateApplication = gql`
mutation Mutation($input: UserApplicationInput!) {
  updateApplication(input: $input) {
    id
    userId
    applicationId
    status
    messages
    succeeded
  }
}
`

const defaultValues = {
    name: "Future Leaders Bursary",
    description: "A bursary aimed at supporting high-performing students from underprivileged backgrounds.",
    deadline: "2024-11-30", // Example in YYYY-MM-DD format
    url: "https://futureleadersbursary.org/apply"
};

const _GetApplicationById = gql`
query GetApplicationById($getApplicationByIdId: String!) {
  getApplicationById(id: $getApplicationByIdId) {
    name
    id
    description
    type
    deadline
    courses
    applyLink
    messages
    succeeded
  }
}
`

type FormSchemaType = z.infer<typeof FormSchema>;

function BursaryApply() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [updateApplication] = useMutation(_UpdateApplication)

    const { register, setValue, formState: { errors } } = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
        defaultValues: !import.meta.env.DEV ? defaultValues : {}
    });

    const { data, error, loading } = useQuery<GetApplicationByIdQuery>(_GetApplicationById, {
        variables: { getApplicationByIdId: id },
        skip: !id,  // Ensures query does not run without an id
    });

    const handleChange = (
        _: React.SyntheticEvent | null,
        newValue: string | null,
    ) => {
        if (newValue)
            updateApplication({ variables: { input: { applicationId: id, status: newValue, } } })
    };

    useEffect(() => {
        if (id && data?.getApplicationById?.succeeded) {
            Object.keys(data.getApplicationById).forEach((key) => {
                setValue(key as keyof FormSchemaType, (data.getApplicationById as any)[key as keyof FormSchemaType]);
            });
        }
    }, [data, id, setValue]);

    if (error) {
        return (
            <Notice
                onClose={() => navigate('/')}
                messages={["An error happened on the server."]}
            />
        );
    }

    if (loading) return <CircularProgress />;

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Typography level="h3" component="h2" sx={{ mt: 1, mb: 2 }}>
                {id ? "Edit your application below" : " Submit a bursary application"}
            </Typography>
            <Box sx={{ my: 1 }}>
                <FormLabel>Set status</FormLabel>
                <Select defaultValue={ApplicationStatus.Applied.toString()} onChange={handleChange}>
                    {Object.entries(ApplicationStatus)
                        .filter(([_, value]) => typeof value === "number") // Filters out reverse mappings (if TypeScript compiles enums as objects)
                        .map(([key, value]) => (
                            <Option key={value} value={value}>{key.replace(/([A-Z])/g, ' $1').trim()}</Option>
                        ))}
                </Select>
            </Box>
            <Typography component="h5" sx={{ mt: 1, mb: 2 }}>
                Details
            </Typography>

            <Stack spacing={4} sx={{ display: 'flex', mx: 'auto', }}>
                <Card>
                    <TextField readOnly label={"Bursary name"} fieldName="name" placeholder="name"
                        register={register} fieldError={errors.name} type="text"></TextField>

                    <FTextarea readOnly label={"Description"} fieldName="description"
                        placeholder="Description" register={register} fieldError={errors.description} type="text"></FTextarea>

                    <TextField readOnly label={"Deadline (It may not be applicable)"} fieldName="deadline"
                        defaultValue={data?.getApplicationById.deadline}
                        placeholder="YYYY-MM-DD" register={register} fieldError={errors.deadline} type="date"
                    />
                    <a
                        href={data?.getApplicationById.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <TextField readOnly={true} label={"URL (Click to go to the url)"} fieldName="applyLink"
                            placeholder="https://example.com" register={register} fieldError={errors.applyLink} type="url"
                        />
                    </a>                    </Card>
            </Stack>
        </Box>
    )
}

export default BursaryApply