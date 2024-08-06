/* eslint-disable @typescript-eslint/no-namespace */
import { DriverSchema, SeasonSchema } from './prisma';

import z from 'zod';

export namespace DatabaseTypes {
  export const Driver = DriverSchema.describe('Driver');
  export type Driver = z.infer<typeof Driver>;

  export const Season = SeasonSchema.describe('Season');
  export type Season = z.infer<typeof Season>;
}

export namespace ResponseTypes {
  function getPagedResponse<T extends z.ZodTypeAny>(schema: T) {
    return z.object({
      href: z.string().url(),
      limit: z.number().int().positive(),
      next: z.string().url().nullable(),
      offset: z.number().int().nonnegative(),
      items: schema.array(),
    });
  }

  export const Driver = DatabaseTypes.Driver;
  export type Driver = DatabaseTypes.Driver;

  export const Drivers = getPagedResponse<typeof Driver>(Driver);
  export type Drivers = z.infer<typeof Drivers>;
}

const ErrorResponse = z.object({
  status_code: z.number().int().min(400).max(599),
  internal_code: z.number().int().min(1000).max(9999),
  description: z.string(),
});
type ErrorResponse = z.infer<typeof ErrorResponse>;

export { ErrorResponse };

export const ParamTypes = {
  DriverID: z.object({ DriverID: z.string().uuid() }),
};
