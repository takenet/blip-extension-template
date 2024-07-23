import type { z } from 'zod';
import { array, date, number, object, string, tuple } from 'zod';

export const ticketsFormSchema = object({
  status: array(string()),
  attendant: array(string()),
  contact: array(string()),
  storageDate: tuple([date().nullable(), date().nullable()]),
  openDate: tuple([date().nullable(), date().nullable()]),
  closeDate: tuple([date().nullable(), date().nullable()]),
  statusDate: tuple([date().nullable(), date().nullable()]),
  sequentialId: array(number()),
  team: array(string()),
});

export type ValidTicketsFormValues = z.infer<typeof ticketsFormSchema>;
