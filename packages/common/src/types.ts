import z from "zod";

const ErrorResponse = z.object({
  code: z.number().int().min(400).max(599),
  description: z.string(),
});

const Driver = z.object({
  id: z.string().uuid(),
  name: z.string(),
  nationality: z.string().length(2),
  dob: z.string().date(),
});

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

const Circuit = z.object({
  id: z.string().uuid(),
  name: z.string(),
  country: z.string().length(2),
  date_opened: z.string().date(),
  layout: CircuitLayout.array().min(1),
});

const GPWeekend = z.object({
  id: z.string().uuid(),
  start_date: z.string().date(),
  end_date: z.string().date(),
  circuit: z.string().uuid(),
  sessions: z.string().uuid().array().min(1),
  driver_entries: z.string().uuid().array().min(1),
  team_entries: z.string().uuid().array().min(1),
});

const PointSystem = z.object({
  awards_extra_point_for_fastest_lap_t10: z.boolean(),
});

const Season = z.object({
  drivers: z.string().uuid().array(),
  num_of_rounds: z.number().int(),
  is_current_season: z.boolean().default(false),
  point_system: PointSystem,
});

function getPagedResponse<T extends z.ZodTypeAny>(schema: T) {
  return z.object({
    href: z.string().url(),
    limit: z.number().int().positive(),
    next: z.string(),
    offset: z.number().int().nonnegative(),
    items: schema.array()
  });
}

const MultipleDrivers = getPagedResponse<typeof Driver>(Driver);

export { ErrorResponse, Driver, CircuitLayout, Circuit, GPWeekend, Season };
