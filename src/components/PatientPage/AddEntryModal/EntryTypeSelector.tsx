import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { EntryType } from '../../../types';

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
      <MenuItem value={EntryType.HealthCheck}>Health check</MenuItem>
      <MenuItem value={EntryType.OccupationalHealthcare} disabled>
        Occupational healthcare
      </MenuItem>
      <MenuItem value={EntryType.Hospital} disabled>
        Hospital
      </MenuItem>
    </Select>
  </FormControl>
);

export default EntryTypeSelector;
