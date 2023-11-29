import {
  ArrowRight,
  ExpandMore,
  FavoriteTwoTone,
  LocalHospitalOutlined,
  WorkTwoTone,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Diagnosis, Entry, Type } from '../../../types';
import EntryDetails from './EntryDetails';

const Entries = ({
  entries,
  diagnoses,
}: {
  entries: Entry[];
  diagnoses: Diagnosis[];
}) => {
  const entryIcon = (entry: Entry) => {
    switch (entry.type) {
      case Type.HealthCheck:
        return <FavoriteTwoTone />;
      case Type.OccupationalHealthcare:
        return <WorkTwoTone />;
      case Type.Hospital:
        return <LocalHospitalOutlined />;
      default:
        return null;
    }
  };
  return (
    <Box>
      <Typography align='center' variant='h6'>
        Entries
      </Typography>
      {entries.map((entry) => (
        <Accordion key={entry.id}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: '0.5em',
                }}
              >
                {entryIcon(entry)}
                <Typography sx={{ width: 'auto', flexShrink: 0 }}>
                  {entry.date}
                </Typography>
              </Box>
              <Typography sx={{ color: 'text.secondary' }}>
                {entry.description}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Diagnosis by {entry.specialist}</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>
              {entry.diagnosisCodes && 'Diagnoses:'}
            </Typography>
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
            <EntryDetails entry={entry} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Entries;
