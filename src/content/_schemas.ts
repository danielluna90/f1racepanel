import z from "zod";

export const sessionInfo = z.object({
  time: z.date(),
  timeOfDay: z.union([z.literal('day'), z.literal('night')]).default('day'),
  weather: z.union([z.literal('clear'), z.literal('partlyclear'), z.literal('cloudy'), z.literal('rain'), z.literal('heavyrain')]).optional()
})

const normalGP = z.object({
  fp1: sessionInfo,
  fp2: sessionInfo,
  fp3: sessionInfo,
  qualifying: sessionInfo,
  race: sessionInfo,
});

const sprint2022GP = z.object({
  practice: sessionInfo,
  qualifying: sessionInfo,
  sprint: sessionInfo,
  race: sessionInfo,
});

const sprintGP = z.object({
  practice: sessionInfo,
  qualifying: sessionInfo,
  sprintQualifying: sessionInfo,
  sprint: sessionInfo,
  race: sessionInfo,
});

const driver = z.object({
  name: z.string(),
  num: z.number(),
  abr: z.string().max(3),
  team: z.string(),
});

export const gpSchema = z
  .object({
    name: z.string(),
    status: z
      .union([
        z.literal("Upcoming"),
        z.literal("Completed"),
        z.literal("Canceled"),
        z.literal("TBD"),
      ])
      .default("TBD"),
    weekendInfo: z
      .discriminatedUnion("weekendType", [
        z.object({ weekendType: z.literal("Normal"), sessionInfo: normalGP }),
        z.object({ weekendType: z.literal("Sprint 2022"), sessionInfo: sprint2022GP }),
        z.object({ weekendType: z.literal("Sprint"), sessionInfo: sprintGP }),
      ])
      .optional(),
    standings: z
      .array(z.object({ pos: z.number(), driverNum: z.number() }))
      .optional(),
    map: z.string().optional(),
  })
  .describe("This describes a Formula 1 Weekend");

export const metadataSchema = z.object({
  drivers: z.array(driver),
});
