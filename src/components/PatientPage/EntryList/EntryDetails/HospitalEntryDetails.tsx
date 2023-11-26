import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { HospitalEntry } from '../../../../types';

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
      }}
    >
      <Divider />
      <Typography>
        <b>Type of entry:</b> Hospital entry
      </Typography>
      <TableContainer>
        <Typography>
          <b>Discharge:</b>
        </Typography>
        <Table style={{ width: 'auto', marginBottom: 10 }}>
          <TableBody>
            <TableRow>
              <TableCell>Date:</TableCell>
              <TableCell>{entry.discharge.date}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Criteria:</TableCell>
              <TableCell>{entry.discharge.criteria}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HospitalEntryDetails;
