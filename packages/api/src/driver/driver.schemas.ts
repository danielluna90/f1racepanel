import z from 'zod';

export const editDriverParamsSchema = z.object({
  DriverID: z.string().uuid(),
});

export type EditDriverParamsSchema = z.infer<typeof editDriverParamsSchema>;
