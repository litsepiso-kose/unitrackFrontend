import { CreateRounded, InfoOutlined } from "@mui/icons-material"
import { Alert, Box, Button, CircularProgress, Typography } from "@mui/joy"
import BasicTable from "../../components/BasicTable";
import { ROUTES } from "../../helpers/common";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Notice } from "../../components/Notice";
import { GetAllApplicationsQuery } from "../../__generated__/graphql";

const _GetApplications = gql`
query GetAllApplications {
  getAllApplications {
    name
    description
    type
    deadline
    courses
    applyLink
    id
    messages
    succeeded
    
  }
}`

function Bursary() {
  const navigate = useNavigate();

  const { data, error, loading } = useQuery<GetAllApplicationsQuery>(_GetApplications, { variables: { type: 0 } })
  console.log(data?.getAllApplications)
  if (error) return <Notice onClose={() => { window.location.href = '/' }} messages={["An error happened on the server."]}></Notice>

  if (loading) return <CircularProgress />

  return (
    <Box>
      {data?.getAllApplications.length === 0 && < Alert variant='outlined' color='warning' startDecorator={<InfoOutlined />}>You have not applied to a bursary yet. CLick the apply button to start</Alert>}
      {!data?.getAllApplications[0]?.succeeded && data?.getAllApplications[0] && <Notice onClose={() => { window.location.href = '/' }} messages={data?.getAllApplications[0]?.messages || []}></Notice>}

      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ alignItems: 'center', gap: 1 }}>
          <Typography level="title-lg" textColor="text.secondary" component="h1">
            My applications
          </Typography>
          <Typography level="title-sm" textColor="text.tertiary">
            {data?.getAllApplications.length} bursary(ies)
          </Typography>
        </Box>
      </Box>

      <BasicTable
        onRowClick={(_) => { }}
        data={
          data?.getAllApplications.map(item => ({
            id: item.id,
            Name: item.name || "",
            Description: item.description || "",
            Deadline: item.deadline || "",
            Status: 2,
            "Type": item.type === 0 ? "Bursary" : "Academic",
            "Apply link": item.applyLink
          })) || []
        }
      />

    </Box >
  )
}

export default Bursary