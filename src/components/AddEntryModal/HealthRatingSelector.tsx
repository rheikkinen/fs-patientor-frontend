import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { HealthCheckRating } from '../../types';

interface Props {
  rating: string;
  onChange: (event: SelectChangeEvent) => void;
}

const HealthRatingSelector = ({ rating, onChange }: Props) => (
  <FormControl>
    <InputLabel id='select-health-rating-label'>Health rating</InputLabel>
    <Select
      labelId='select-health-rating-label'
      id='select-health-rating'
      value={rating}
      fullWidth
      label='Health rating'
      onChange={onChange}
    >
      <MenuItem value={HealthCheckRating.Healthy}>0 — Healthy</MenuItem>
      <MenuItem value={HealthCheckRating.LowRisk}>1 — Low risk</MenuItem>
      <MenuItem value={HealthCheckRating.HighRisk}>2 — High risk</MenuItem>
      <MenuItem value={HealthCheckRating.CriticalRisk}>
        3 — Diagnosed condition
      </MenuItem>
    </Select>
  </FormControl>
);

export default HealthRatingSelector;
