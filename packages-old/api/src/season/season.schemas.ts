import z from 'zod';

export const getSeasonParamsSchema = z.object({
  Year: z.coerce.number().int().gte(1950),
});
export type GetSeasonsParamsSchema = z.infer<typeof getSeasonParamsSchema>;
