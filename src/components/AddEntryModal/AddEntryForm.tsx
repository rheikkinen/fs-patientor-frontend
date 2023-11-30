import {
  Box,
  Button,
  Grid,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import {
  Diagnosis,
  EntryFormValues,
  EntryType,
  HealthCheckRating,
  Type,
} from '../../types';
import EntryTypeSelector from './EntryTypeSelector';
import DiagnosisCodeSelector from './DiagnosisCodeSelector';
import HealthRatingSelector from './HealthRatingSelector';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis['code']>
  >([]);
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const [entryType, setEntryType] = useState<EntryType>(Type.HealthCheck);

  const handleEntryTypeChange = (event: SelectChangeEvent<EntryType>) => {
    const value = event.target.value;
    const type = Object.values(Type).find((t) => t.toString() === value);
    if (type) {
      setEntryType(type);
    }
  };

  const handleDiagnosisSelect = (
    event: SelectChangeEvent<Array<Diagnosis['code']>>
  ) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const handleHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    const rating = Object.values(HealthCheckRating).find(
      (rating) => rating === value
    );
    if (rating !== undefined) {
      setHealthCheckRating(rating.toString());
    }
  };

  const getEntryDetails = () => {
    const baseDetails = {
      date,
      description,
      diagnosisCodes,
      specialist,
    };
    switch (entryType) {
      case Type.HealthCheck:
        return {
          ...baseDetails,
          type: Type.HealthCheck,
          healthCheckRating,
        };

      case Type.OccupationalHealthcare:
        return {
          ...baseDetails,
          type: Type.OccupationalHealthcare,
          employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? {
                  startDate: sickLeaveStart,
                  endDate: sickLeaveEnd,
                }
              : null,
        };
      case Type.Hospital:
        return {
          ...baseDetails,
          type: Type.Hospital,
          discharge:
            dischargeDate && dischargeCriteria
              ? { date: dischargeDate, criteria: dischargeCriteria }
              : null,
        };
      default:
        throw new Error(`Invalid entry type: ${entryType}`);
    }
  };

  const additionalFormFields = () => {
    switch (entryType) {
      case Type.HealthCheck:
        return (
          <HealthRatingSelector
            rating={healthCheckRating}
            onChange={handleHealthCheckRatingChange}
          />
        );
      case Type.OccupationalHealthcare:
        return (
          <>
            <TextField
              label='Employer name'
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <Typography>Sick leave:</Typography>
            <Grid container item spacing='0.5em'>
              <Grid item xs>
                <TextField
                  type='date'
                  label='Start date'
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={sickLeaveStart}
                  onChange={({ target }) => setSickLeaveStart(target.value)}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  type='date'
                  label='End date'
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={sickLeaveEnd}
                  onChange={({ target }) => setSickLeaveEnd(target.value)}
                />
              </Grid>
            </Grid>
          </>
        );
      case Type.Hospital:
        return (
          <>
            <Typography>Discharge info:</Typography>
            <TextField
              type='date'
              label='Discharge date'
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label='Discharge criteria'
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        );
      default:
        break;
    }
  };

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entryDetails = getEntryDetails();
    onSubmit(entryDetails as EntryFormValues);
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
            type='date'
            label='Date'
            InputLabelProps={{ shrink: true }}
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
          <DiagnosisCodeSelector
            onChange={handleDiagnosisSelect}
            selectedCodes={diagnosisCodes}
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
