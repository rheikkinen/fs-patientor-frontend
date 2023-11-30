import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from '@mui/material';
import { Diagnosis } from '../../types';
import { useEffect, useState } from 'react';
import diagnosisService from '../../services/diagnoses';
import { MenuOpen } from '@mui/icons-material';

interface Props {
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  selectedCodes: Array<Diagnosis['code']>;
}

const DiagnosisCodeSelector = ({ onChange, selectedCodes }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };

    void fetchDiagnoses();
  }, []);
  return (
    <Grid container spacing={1}>
      <Grid item xs={10}>
        <TextField
          select
          label='Diagnosis codes'
          fullWidth
          value={selectedCodes}
          SelectProps={{
            multiple: true,
            open: open,
            onOpen: handleOpen,
            onClose: handleClose,
            renderValue: (selected) => (selected as string[]).join(', '),
          }}
          onChange={onChange}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              <Checkbox checked={selectedCodes.indexOf(diagnosis.code) > -1} />
              {diagnosis.code}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={2}>
        <Box
          sx={{
            display: { xs: 'none', sm: 'block' },
            height: '100%',
          }}
        >
          <Button
            startIcon={<MenuOpen />}
            sx={{ height: '100%' }}
            fullWidth
            onClick={handleOpen}
          >
            Open
          </Button>
        </Box>
        <Box
          sx={{
            display: { xs: 'block', sm: 'none' },
            height: '100%',
          }}
        >
          <IconButton
            color='primary'
            sx={{ width: '100%', height: '100%' }}
            onClick={handleOpen}
          >
            <MenuOpen />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DiagnosisCodeSelector;
