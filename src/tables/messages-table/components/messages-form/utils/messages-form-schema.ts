import type { z } from 'zod';
import { object, string } from 'zod';

export const messagesFormSchema = object({
  ticket: string(),
});

export type ValidMessagesFormValues = z.infer<typeof messagesFormSchema>;
