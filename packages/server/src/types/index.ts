/* eslint-disable @typescript-eslint/no-namespace */
import { DriverSchema } from './prisma';

import z from 'zod';

export namespace DatabaseTypes {
  export const Driver = DriverSchema.describe('Driver');
  export type Driver = z.infer<typeof Driver>;
}

export namespace ResponseTypes {
  export const Driver = DatabaseTypes.Driver;
  export type Driver = DatabaseTypes.Driver;
}

export const ParamTypes = {
  DriverID: z.object({ DriverID: z.string().uuid() }),
};
