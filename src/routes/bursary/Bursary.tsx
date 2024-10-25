import { CreateRounded, InfoOutlined } from "@mui/icons-material"
import { Alert, Box, Button, CircularProgress, Typography } from "@mui/joy"
import BasicTable from "../../components/BasicTable";
import { ROUTES } from "../../helpers/common";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Notice } from "../../components/Notice";
import { GetApplicationsQuery } from "../../__generated__/graphql";

const _GetApplications = gql`
query GetApplications($type: Float!) {
  getApplications(type: $type) {
    deadline
    description
    fullName
    messages
    name
    status
    succeeded
    type
    typeId
    url
    id
  }
}
`
function Bursary() {
  const navigate = useNavigate();

  const { data, error, loading } = useQuery<GetApplicationsQuery>(_GetApplications, { variables: { type: 0 } })
  console.log(data?.getApplications)
  if (error) return <Notice onClose={() => { window.location.href = '/' }} messages={["An error happened on the server."]}></Notice>

  if (loading) return <CircularProgress />

  return (
    <Box>
      {data?.getApplications.length === 0 && < Alert variant='outlined' color='warning' startDecorator={<InfoOutlined />}>You have not applied to a bursary yet. CLick the apply button to start</Alert>}
      {!data?.getApplications[0]?.succeeded && <Notice onClose={() => { window.location.href = '/' }} messages={data?.getApplications[0].messages || []}></Notice>}

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
            {data?.getApplications.length} bursary(ies)
          </Typography>
        </Box>
        <Button
          size="sm" onClick={() => navigate(ROUTES.BURSARY_APPLY)}
          startDecorator={<CreateRounded />}
          sx={{ ml: 'auto' }}
        >
          Apply
        </Button>
      </Box>

      <BasicTable
        onRowClick={(id) => navigate(ROUTES.BURSARY_APPLY + '/' + id)}  // Adjust navigation as needed
        data={data?.getApplications.map(item => ({
          deadline: item.deadline || "",
          status: item.status || 2,
          description: item.description || "",
          name: item.name || "",
          id: item.id
        })) || []}
      />
    </Box >
  )
}

export default Bursary