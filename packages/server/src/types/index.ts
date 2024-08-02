import { DriverSchema } from './prisma';

import z from 'zod';

export const DatabaseTypes = {
  Driver: DriverSchema.describe('Driver'),
};

export const ParamTypes = {
  DriverID: z.object({ DriverID: z.string().uuid() }),
};
