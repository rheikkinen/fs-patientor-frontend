import { Box, Divider, Typography } from '@mui/material';
import HealthRatingBar from '../../../HealthRatingBar';
import { HealthCheckEntry } from '../../../../types';

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  const rating = entry.healthCheckRating;
  return (
    <div className='App'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
        }}
      >
        <Divider />
        <Typography>
          <b>Type of entry:</b> Health check
        </Typography>
        <Box style={{ display: 'flex', gap: '0.5em' }}>
          <Typography>
            <b>Health rating:</b>
          </Typography>
          <HealthRatingBar rating={rating} showText={false} />
        </Box>
      </Box>
    </div>
  );
};

export default HealthCheckEntryDetails;
