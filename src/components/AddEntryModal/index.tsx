import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from '@mui/material';
import AddEntryForm from './AddEntryForm';
import { EntryFormValues } from '../../types';
import { useEffect, useRef } from 'react';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error && dialogRef.current) {
      dialogRef.current.scrollTop = 0;
    }
  }, [error]);

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent
        ref={dialogRef}
        sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}
      >
        {error && <Alert severity='error'>{error}</Alert>}
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
