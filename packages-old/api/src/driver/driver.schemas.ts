import z from 'zod';

export const editDriverParamsSchema = z.object({
  DriverID: z.string().uuid(),
});

export type EditDriverParamsSchema = z.infer<typeof editDriverParamsSchema>;

export const getDriverParamsSchema = z.object({
  DriverID: z.string().uuid(),
});

export type GetDriverParamsSchema = z.infer<typeof getDriverParamsSchema>;
