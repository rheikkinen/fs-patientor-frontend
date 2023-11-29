import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { EntryType, Type } from '../../types';

interface Props {
  selectedType: EntryType;
  onChange: (event: SelectChangeEvent) => void;
}

const EntryTypeSelector = ({ selectedType, onChange }: Props) => (
  <FormControl>
    <InputLabel id='select-entry-type-label'>Type of entry</InputLabel>
    <Select
      id='select-entry-type'
      defaultValue={selectedType}
      value={selectedType}
      fullWidth
      label='Type of entry'
      onChange={onChange}
    >
      <MenuItem value={Type.HealthCheck}>Health check</MenuItem>
      <MenuItem value={Type.OccupationalHealthcare}>
        Occupational healthcare
      </MenuItem>
      <MenuItem value={Type.Hospital}>Hospital</MenuItem>
    </Select>
  </FormControl>
);

export default EntryTypeSelector;
