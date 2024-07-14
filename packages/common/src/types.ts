import z from "zod";

namespace DatabaseTypes {
  export const Driver = z.object({
    id: z.string().uuid(),
    name: z.string(),
    nationality: z.string().length(2),
    dob: z.string().date(),
  });
  export type Driver = z.infer<typeof Driver>;

  export const Drivers = getPagedResponse<typeof Driver>(Driver);
  export type Drivers = z.infer<typeof Drivers>;
};

namespace ObjectTypes {
  export const Driver = DatabaseTypes.Driver.omit({ id: true });
  export type Driver = z.infer<typeof Driver>;

  export const Drivers = getPagedResponse<typeof Driver>(Driver);
  export type Drivers = z.infer<typeof Drivers>;
};

export { DatabaseTypes, ObjectTypes };

const ErrorResponse = z.object({
  status_code: z.number().int().min(400).max(599),
  internal_code: z.number().int().min(1000).max(9999),
  description: z.string(),
});
type ErrorResponse = z.infer<typeof ErrorResponse>;

const CircuitLayout = z.object({
  id: z.string().uuid(),
  name: z.string(),
  first_year: z.number().int(),
  last_year: z.number().int(),
  track_length: z.number(),
  race_lap_record: z.object({
    time: z.string().regex(new RegExp("^d{1}:d{2}.d{3}$")),
    driver_id: z.string().uuid(),
  }),
});
type CircuitLayout = z.infer<typeof CircuitLayout>;

const Circuit = z.object({
  id: z.string().uuid(),
  name: z.string(),
  country: z.string().length(2),
  date_opened: z.string().date(),
  layout: CircuitLayout.array().min(1),
});
type Circuit = z.infer<typeof Circuit>;

const GPWeekend = z.object({
  id: z.string().uuid(),
  start_date: z.string().date(),
  end_date: z.string().date(),
  circuit: z.string().uuid(),
  sessions: z.string().uuid().array().min(1),
  driver_entries: z.string().uuid().array().min(1),
  team_entries: z.string().uuid().array().min(1),
});
type GPWeekend = z.infer<typeof GPWeekend>;

const PointSystem = z.object({
  awards_extra_point_for_fastest_lap_t10: z.boolean(),
});
type PointSystem = z.infer<typeof PointSystem>;

const Season = z.object({
  drivers: z.string().uuid().array(),
  num_of_rounds: z.number().int(),
  is_current_season: z.boolean().default(false),
  point_system: PointSystem,
});
type Season = z.infer<typeof Season>;

function getPagedResponse<T extends z.ZodTypeAny>(schema: T) {
  return z.object({
    href: z.string().url(),
    limit: z.number().int().positive(),
    next: z.string().url().nullable(),
    offset: z.number().int().nonnegative(),
    items: schema.array()
  });
}

export { ErrorResponse, CircuitLayout, Circuit, GPWeekend, Season };
