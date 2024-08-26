import z from "zod";

// These are supposed to match the Database Models from Prisma
namespace DatabaseTypes {
  export const Driver = z.object({
    id: z.string().uuid(),
    name: z.string(),
    nationality: z.string().length(2),
    dob: z.string().date(),
  });
  export type Driver = z.infer<typeof Driver>;

  export const RaceLapRecord = z.object({
    id: z.string().uuid(),
    time: z.string().regex(new RegExp("^d{1}:d{2}.d{3}$")),
    driver: Driver,
    driver_id: z.string().uuid(),
  });
  export type RaceLapRecord = z.infer<typeof RaceLapRecord>;
 
  export const CircuitLayout = z.object({
    id: z.string().uuid(),
    first_year: z.number().int(),
    last_year: z.number().int(),
    track_length: z.number(),
    race_lap_record: RaceLapRecord,
    race_lap_record_id: z.string().uuid(),
    circuit: z.object({}),
    circuit_id: z.string().uuid(),
    
  });
  export type CircuitLayout = z.infer<typeof CircuitLayout>;
  
  export const Circuit = z.object({
    id: z.string().uuid(),
    name: z.string(),
    country: z.string().length(2),
    date_opened: z.string().date(),
    layouts: CircuitLayout.array().min(1),
    //gp_weekends: GPWeekend.array().min(1),
  });
  export type Circuit = z.infer<typeof Circuit>;
  
  export const GPWeekend = z.object({
    id: z.string().uuid(),
    start_date: z.string().date(),
    end_date: z.string().date(),
    circuit: z.string().uuid(),
    sessions: z.string().uuid().array().min(1),
    driver_entries: z.string().uuid().array().min(1),
    team_entries: z.string().uuid().array().min(1),
  });
  export type GPWeekend = z.infer<typeof GPWeekend>;
  
  export const PointSystem = z.object({
    awards_extra_point_for_fastest_lap_t10: z.boolean(),
  });
  export type PointSystem = z.infer<typeof PointSystem>;
  
  export const Season = z.object({
    drivers: z.string().uuid().array(),
    num_of_rounds: z.number().int(),
    is_current_season: z.boolean().default(false),
    point_system: PointSystem,
  });
  export type Season = z.infer<typeof Season>;
};

// These are supposed to match the requests in the API Specification
namespace RequestTypes {
  export const Driver = DatabaseTypes.Driver.omit({ id: true });
  export type Driver = z.infer<typeof Driver>;

  export const CircuitLayout = DatabaseTypes.CircuitLayout.omit({ id: true });
  export type CircuitLayout = z.infer<typeof CircuitLayout>;

  export const Circuit = DatabaseTypes.Circuit.omit({ id: true });
  export type Circuit = z.infer<typeof Circuit>;

  export const GPWeekend = DatabaseTypes.GPWeekend.omit({ id: true });
  export type GPWeekend = z.infer<typeof GPWeekend>;

  export const PointSystem = DatabaseTypes.PointSystem;
  export type PointSystem = DatabaseTypes.PointSystem;

  export const Season = DatabaseTypes.Season;
  export type Season = DatabaseTypes.Season;
};

// These are supposed to match the responses in the API Specification
namespace ResponseTypes {
  function getPagedResponse<T extends z.ZodTypeAny>(schema: T) {
    return z.object({
      href: z.string().url(),
      limit: z.number().int().positive(),
      next: z.string().url().nullable(),
      offset: z.number().int().nonnegative(),
      items: schema.array()
    });
  }

  export const Driver = DatabaseTypes.Driver.omit({ id: true });
  export type Driver = z.infer<typeof Driver>;

  export const Drivers = getPagedResponse<typeof Driver>(Driver);
  export type Drivers = z.infer<typeof Drivers>;

  export const CircuitLayout = DatabaseTypes.CircuitLayout.omit({ id: true });
  export type CircuitLayout = z.infer<typeof CircuitLayout>;

  export const Circuit = DatabaseTypes.Circuit.omit({ id: true });
  export type Circuit = z.infer<typeof Circuit>;

  export const GPWeekend = DatabaseTypes.GPWeekend.omit({ id: true });
  export type GPWeekend = z.infer<typeof GPWeekend>;

  export const PointSystem = DatabaseTypes.PointSystem;
  export type PointSystem = DatabaseTypes.PointSystem;

  export const Season = DatabaseTypes.Season;
  export type Season = DatabaseTypes.Season;
}

export { DatabaseTypes, RequestTypes, ResponseTypes };

const ErrorResponse = z.object({
  status_code: z.number().int().min(400).max(599),
  internal_code: z.number().int().min(1000).max(9999),
  description: z.string(),
});
type ErrorResponse = z.infer<typeof ErrorResponse>;

export { ErrorResponse };
