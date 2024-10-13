import { useState } from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// List of universities with closing dates
const universities = [
  { name: "Nelson Mandela University (NMU)", date: "5 August 2024" },
  { name: "University of Pretoria", date: "" },
  { name: "North-West University", date: "" },
  { name: "University of South Africa", date: "11 October 2024" },
  { name: "University of the Free State", date: "30 September 2024" },
  { name: "Rhodes University", date: "31 July 2024" },
  { name: "Walter Sisulu University", date: "28 September 2024" },
  { name: "University of Johannesburg", date: "30 November 2024" },
  { name: "University of the Western Cape", date: "31 August 2024" },
  { name: "University of KwaZulu-Natal", date: "November 2024" },
  { name: "University of Witwatersrand", date: "30 June 2024" },
  { name: "University of Cape Town", date: "31 August 2024" },
  { name: "University of Limpopo", date: "30 September 2024" },
  { name: "University of Venda", date: "27 September 2024" },
  { name: "University of Mpumalanga", date: "06 November 2024" },
  { name: "Stellenbosch University", date: "31 July 2024" },
  { name: "Sol Plaatje University", date: "30 September 2024" },
  { name: "Sefako Makgatho Health Sciences University", date: "31 July 2024" },
  { name: "Central University of Technology", date: "31 August 2024" },
  { name: "Cape Peninsula University of Technology", date: "31 August 2024" },
  { name: "Tshwane University of Technology", date: "31 July 2024" },
  { name: "Vaal University of Technology", date: "30 September 2024" },
  { name: "Mangosuthu University of Technology", date: "" },
  { name: "Durban University of Technology", date: "" },
];

const statuses = ["Not Applied", "Applied", "Pending", "Accepted", "Rejected"];

export default function UniversityTable() {
  const [statusState, setStatusState] = useState(
    universities.map(() => "Not Applied") // Default all statuses to 'Not Applied'
  );

  const handleChange = (index: number, event: any) => {
    const newStatuses = [...statusState];
    newStatuses[index] = event.target.value;
    setStatusState(newStatuses);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        University Applications
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>University</TableCell>
              <TableCell>Closing Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {universities.map((university, index) => (
              <TableRow key={index}>
                <TableCell>{university.name}</TableCell>
                <TableCell>{university.date || "N/A"}</TableCell>
                <TableCell>
                  <Select
                    value={statusState[index]}
                    onChange={(event) => handleChange(index, event)}
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
