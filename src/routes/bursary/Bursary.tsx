import { CreateRounded, InfoOutlined } from "@mui/icons-material"
import { Alert, Box, Button, Divider, Typography } from "@mui/joy"
import BasicTable from "../../components/BasicTable";
import { ROUTES } from "../../helpers/common";
import { useNavigate } from "react-router-dom";

function Bursary() {
  const navigate = useNavigate();

  return (
    <Box>
      <Alert variant='outlined' color='warning' startDecorator={<InfoOutlined />}>You have not applied to a bursary yet. CLick the apply button to start</Alert>
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
            5 bursaries
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
      <Divider />
      <BasicTable
        onRowClick={(id) => navigate(ROUTES.SIGNUP + '/' + id)}  // Adjust navigation as needed
        data={dummyData.map(item => {
          return { ...item };
        })}
      />
    </Box>
  )
}

const dummyData = [
  {
    id: 1,
    bursaryName: 'ABC Bursary',
    status: 'Pending',
    deadline: '2024-12-01'
  },
  {
    id: 2,
    bursaryName: 'XYZ Scholarship',
    status: 'Approved',
    deadline: '2024-11-15'
  },
  {
    id: 3,
    bursaryName: 'DEF Bursary',
    status: 'Rejected',
    deadline: '2024-10-31'
  }
];


export default Bursary