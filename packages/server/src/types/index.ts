/* eslint-disable @typescript-eslint/no-namespace */
import {
  CircuitLayoutSchema,
  CircuitSchema,
  DriverSchema,
  SeasonSchema,
} from './prisma';

import z from 'zod';

export namespace DatabaseTypes {
  export const Driver = DriverSchema;
  export type Driver = z.infer<typeof Driver>;

  export const Circuit = CircuitSchema;
  export type Circuit = z.infer<typeof Circuit>;

  export const CircuitLayout = CircuitLayoutSchema;
  export type CircuitLayout = z.infer<typeof CircuitLayout>;

  export const Season = SeasonSchema.describe('Season');
  export type Season = z.infer<typeof Season>;
}

export namespace InputTypes {
  export const Driver = DatabaseTypes.Driver.omit({ id: true }).describe(
    'Driver'
  );
  export type Driver = z.infer<typeof Driver>;

  export const Circuit = DatabaseTypes.Circuit.omit({ id: true }).describe('');
  export type Circuit = z.infer<typeof Circuit>;

  export const CircuitLayout = DatabaseTypes.CircuitLayout.omit({
    id: true,
  }).describe('Circuit Layout');
  export type CircuitLayout = z.infer<typeof CircuitLayout>;

  export const Season = DatabaseTypes.Season.describe('Season');
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

  export const Circuit = DatabaseTypes.Circuit;
  export type Circuit = DatabaseTypes.Circuit;

  export const CircuitLayout = DatabaseTypes.CircuitLayout;
  export type CircuitLayout = DatabaseTypes.CircuitLayout;

  export const Season = DatabaseTypes.Season;
  export type Season = DatabaseTypes.Season;
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

export * from './server';
export * from './errors';
