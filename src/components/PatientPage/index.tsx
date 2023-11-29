import { useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import patientService from '../../services/patients';
import { useEffect, useState } from 'react';
import { Diagnosis, EntryFormValues, Patient } from '../../types';
import EntryList from './EntryList';
import AddEntryModal from '../AddEntryModal';
import axios from 'axios';
import entryService from '../../services/entries';

const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const { id } = useParams<string>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      const returnedData = id ? await patientService.getById(id) : null;
      setPatient(returnedData);
    };
    void fetchPatient();
  }, [id]);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (patient === null) return;
      const newEntry = await entryService.create(values, patient.id);
      setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (
          e?.response?.data?.error &&
          typeof e?.response?.data.error === 'string'
        ) {
          const message = e.response.data.error;
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

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
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            onClose={closeModal}
            error={error}
          />
          <Button variant='contained' onClick={() => openModal()}>
            Add a New Entry
          </Button>
          <EntryList entries={patient.entries} diagnoses={diagnoses} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientPage;
