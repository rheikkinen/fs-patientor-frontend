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
import { OccupationalHealthcareEntry } from '../../../../types';

const OccupationalEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
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
        <b>Type of entry:</b> Occupational healthcare
      </Typography>
      <Typography>
        <b>Employer:</b> {entry.employerName}
      </Typography>
      {entry.sickLeave && (
        <TableContainer>
          <Typography>
            <b>Sick leave:</b>
          </Typography>
          <Table style={{ width: 'auto', marginBottom: 10 }}>
            <TableBody>
              <TableRow>
                <TableCell>Start date:</TableCell>
                <TableCell>{entry.sickLeave.startDate}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>End date:</TableCell>
                <TableCell>{entry.sickLeave.endDate}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default OccupationalEntryDetails;
