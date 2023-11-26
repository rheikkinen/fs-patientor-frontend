import { Entry, EntryType } from '../../../../types';
import { assertNever } from '../../../../utils/helpers';
import HealthCheckEntryDetails from './HealthCheckEntryDetails';
import HospitalEntryDetails from './HospitalEntryDetails';
import OccupationalEntryDetails from './OccupationalEntryDetails';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case EntryType.HealthCheck:
      return <HealthCheckEntryDetails entry={entry} />;

    case EntryType.OccupationalHealthcare:
      return <OccupationalEntryDetails entry={entry} />;

    case EntryType.Hospital:
      return <HospitalEntryDetails entry={entry} />;

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
