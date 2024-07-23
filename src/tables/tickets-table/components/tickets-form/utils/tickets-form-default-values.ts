export const ticketsFormDefaultValues = {
  status: [] as string[],
  attendant: [] as string[],
  contact: [] as string[],
  storageDate: [null, null] as [Date | null, Date | null],
  openDate: [null, null] as [Date | null, Date | null],
  closeDate: [null, null] as [Date | null, Date | null],
  statusDate: [null, null] as [Date | null, Date | null],
  sequentialId: [] as number[],
  team: [] as string[],
};

export type TicketsFormValues = typeof ticketsFormDefaultValues;
