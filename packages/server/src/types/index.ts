/* eslint-disable @typescript-eslint/no-namespace */
import {
  CircuitLayoutSchema,
  CircuitSchema,
  DriverSchema,
  GPWeekendSchema,
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

  export const GPWeekend = GPWeekendSchema.describe('GP Weekend');
  export type GPWeekend = z.infer<typeof GPWeekend>;
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

  export const GPWeekend = DatabaseTypes.GPWeekend.omit({ id: true }).describe(
    'GP Weekend'
  );
  export type GPWeekend = z.infer<typeof GPWeekend>;
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

  export const CircuitLayout = DatabaseTypes.CircuitLayout;
  export type CircuitLayout = DatabaseTypes.CircuitLayout;

  export const Circuit = DatabaseTypes.Circuit.and(
    z.object({
      layouts: ResponseTypes.CircuitLayout.array().optional(),
    })
  );
  export type Circuit = z.infer<typeof ResponseTypes.Circuit>;

  export const Circuits = getPagedResponse<typeof Circuit>(Circuit);
  export type Circuits = z.infer<typeof Circuit>;

  export const Season = DatabaseTypes.Season.and(
    z.object({
      weekends: DatabaseTypes.GPWeekend.array().min(0),
    })
  );
  export type Season = z.infer<typeof ResponseTypes.Season>;

  export const GPWeekend = DatabaseTypes.GPWeekend;
  export type GPWeekend = z.infer<typeof GPWeekend>;
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
