import {
  Box,
  Button,
  Divider,
  Grid,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { EntryFormValues, EntryType } from '../../../types';
import EntryTypeSelector from './EntryTypeSelector';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');

  const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);

  const handleEntryTypeChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    const type = Object.values(EntryType).find((t) => t.toString() === value);
    if (type) {
      setEntryType(type);
    }
  };

  const additionalFormFields = () => {
    switch (entryType) {
      case EntryType.HealthCheck:
        return (
          <TextField
            label='Health check rating (0-3)'
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
          />
        );
      case EntryType.OccupationalHealthcare:
        break;
      case EntryType.Hospital:
        break;
      default:
        break;
    }
  };

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diagnosisCodesArray = diagnosisCodes.split(',');
    onSubmit({
      type: EntryType.HealthCheck,
      date,
      description,
      diagnosisCodes: diagnosisCodesArray,
      specialist,
      healthCheckRating: Number(healthCheckRating),
    });
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
      <EntryTypeSelector
        selectedType={entryType}
        onChange={handleEntryTypeChange}
      />
      <form onSubmit={addEntry}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
          <TextField
            label='Date'
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label='Description'
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label='Specialist'
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <TextField
            label='Diagnosis codes'
            fullWidth
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value)}
          />
          {additionalFormFields()}
          <Grid>
            <Grid item>
              <Button
                color='secondary'
                variant='contained'
                style={{ float: 'left' }}
                type='button'
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: 'right',
                }}
                type='submit'
                variant='contained'
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
};

export default AddEntryForm;
