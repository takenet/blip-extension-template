import { date, or, type TicketStatus } from 'blip-iframe';

export interface GetTicketFilters {
  status?: (TicketStatus | (string & {}))[];
  attendant?: string | string[];
  contact?: string | string[];
  storageDate?: [Date | null, Date | null];
  openDate?: [Date | null, Date | null];
  closeDate?: [Date | null, Date | null];
  sequentialId?: number | number[];
  team?: string | string[];
  statusDate?: [Date | null, Date | null];
}

export function getTicketsFilters({
  status,
  storageDate,
  attendant,
  openDate,
  closeDate,
  contact,
  sequentialId,
  team,
  statusDate,
}: GetTicketFilters) {
  const attendantFilter = or('AgentIdentity', attendant);
  const teamFilter = or('Team', team);
  const sequentialIdFilter = or('SequentialId', sequentialId);
  const contactFilter = or('CustomerIdentity', contact, {
    getQuery: (item) => `substringof('${item}',CustomerIdentity)`,
  });
  const statusFilter = or('status', status);
  const storageDateFilter = date('storageDate', storageDate);
  const openDateFilter = date('openDate', openDate);
  const closeDateFilter = date('closeDate', closeDate);
  const statusDateFilter = date('statusDate', statusDate);

  const filters = [
    statusDateFilter,
    closeDateFilter,
    openDateFilter,
    teamFilter,
    statusFilter,
    storageDateFilter,
    attendantFilter,
    contactFilter,
    sequentialIdFilter,
  ]
    .filter(Boolean)
    .join(' and ');

  return filters;
}
