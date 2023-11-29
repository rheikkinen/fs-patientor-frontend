import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Diagnosis } from '../../types';
import { useEffect, useState } from 'react';
import diagnosisService from '../../services/diagnoses';

interface Props {
  onChange: (event: SelectChangeEvent<string[]>) => void;
  selectedCodes: string[];
}

const DiagnosisCodeSelector = ({ onChange, selectedCodes }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };

    void fetchDiagnoses();
  }, []);
  return (
    <FormControl>
      <InputLabel id='diagnosis-multiple-select-label'>
        Diagnosis codes
      </InputLabel>
      <Select
        labelId='diagnosis-multiple-select-label'
        multiple
        label='Diagnosis codes'
        fullWidth
        value={selectedCodes}
        onChange={onChange}
        renderValue={(selected) => selected.join(', ')}
      >
        {diagnoses.map((diagnosis) => (
          <MenuItem key={diagnosis.code} value={diagnosis.code}>
            <Checkbox checked={selectedCodes.indexOf(diagnosis.code) > -1} />
            {diagnosis.code}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DiagnosisCodeSelector;
