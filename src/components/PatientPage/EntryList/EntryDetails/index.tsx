import { Entry, Type } from '../../../../types';
import { assertNever } from '../../../../utils/helpers';
import HealthCheckEntryDetails from './HealthCheckEntryDetails';
import HospitalEntryDetails from './HospitalEntryDetails';
import OccupationalEntryDetails from './OccupationalEntryDetails';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case Type.HealthCheck:
      return <HealthCheckEntryDetails entry={entry} />;

    case Type.OccupationalHealthcare:
      return <OccupationalEntryDetails entry={entry} />;

    case Type.Hospital:
      return <HospitalEntryDetails entry={entry} />;

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
