import { useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import patientService from '../../services/patients';
import { useEffect, useState } from 'react';
import { Diagnosis, Patient } from '../../types';
import { ArrowRight, ExpandMore } from '@mui/icons-material';

const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const { id } = useParams<string>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const returnedData = id ? await patientService.getById(id) : null;
      setPatient(returnedData);
    };
    void fetchPatient();
  }, [id]);

  if (patient === null)
    return <div style={{ marginTop: 10 }}>Patient not found.</div>;

  return (
    <div className='App'>
      <Card variant='outlined' style={{ display: 'inline-block', padding: 5 }}>
        <CardContent>
          <Typography align='center' variant='h5'>
            {patient.name}
          </Typography>
          <Table style={{ width: 'auto', marginBottom: 10 }}>
            <TableBody>
              <TableRow>
                <TableCell>SSN:</TableCell>
                <TableCell>{patient.ssn}</TableCell>
              </TableRow>
              <TableRow key={patient.id}>
                <TableCell>Gender:</TableCell>
                <TableCell>{patient.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Occupation:</TableCell>
                <TableCell>{patient.occupation}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Typography align='center' variant='h6'>
            Entries
          </Typography>
          {patient.entries.map((entry) => (
            <Accordion key={entry.id}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  {entry.date}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {entry.description}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Diagnoses:</Typography>
                <List dense={true}>
                  {entry.diagnosisCodes?.map((code) => (
                    <ListItem key={code}>
                      <ListItemIcon>
                        <ArrowRight />
                      </ListItemIcon>
                      <ListItemText
                        primary={code}
                        secondary={diagnoses.find((d) => d.code === code)?.name}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientPage;
