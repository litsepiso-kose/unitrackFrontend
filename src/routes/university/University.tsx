import { InfoOutlined } from "@mui/icons-material"
import { Alert, Box, CircularProgress, Typography } from "@mui/joy"
import BasicTable from "../../components/BasicTable";
import { ApplicationStatus, ROUTES } from "../../helpers/common";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Notice } from "../../components/Notice";
import { GetUserApplicationsQuery } from "../../__generated__/graphql";
 
export const _GetApplications = gql`
query GetUserApplications($type: Float!) {
  getUserApplications(type: $type) {
    name
    id
    description
    type
    deadline
    courses
    applyLink
    messages
    succeeded
    status
  }
}
  `

function Bursary() {
  const navigate = useNavigate();

  const { data, error, loading } = useQuery<GetUserApplicationsQuery>(_GetApplications, { variables: { type: 1 } })
  console.log(data?.getUserApplications)
  if (error) return <Notice onClose={() => { window.location.href = '/' }} messages={["An error happened on the server."]}></Notice>

  if (loading) return <CircularProgress />

  return (
    <Box>
      {data?.getUserApplications.length === 0 && < Alert variant='outlined' color='warning' startDecorator={<InfoOutlined />}>You have not applied to a bursary yet. CLick the apply button to start</Alert>}
      {!data?.getUserApplications[0]?.succeeded && data?.getUserApplications[0] && <Notice onClose={() => { window.location.href = '/' }} messages={data?.getUserApplications[0]?.messages || []}></Notice>}

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
            {data?.getUserApplications.length} bursary(ies)
          </Typography>
        </Box>
      </Box>

      <BasicTable
        onRowClick={(id) => navigate(ROUTES.BURSARY_APPLY + '/' + id)}
        data={
          data?.getUserApplications.map(item => ({
            id: item.id,
            Name: item.name || "",
            // Description: item.description || "",
            Deadline: item.deadline || "",
            Status: ApplicationStatus[item.status] || "Unknown",  // Convert status number to string
            "Type": item.type === 0 ? "Bursary" : "Academic",
            "Apply link": item.applyLink
          })) || []
        }
      />

    </Box >
  )
}

export default Bursary