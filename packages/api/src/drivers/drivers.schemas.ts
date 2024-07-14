import { z } from 'zod';

export const getDriversQueriesSchema = z.object({
  limit: z.coerce.number().int().min(1).default(25),
  offset: z.coerce.number().int().min(0).default(0),
});

export type GetDriversQueriesSchema = z.infer<typeof getDriversQueriesSchema>;
