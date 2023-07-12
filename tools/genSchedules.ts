import z from 'zod';
import dateFormat from 'dateformat';

const standingsSchema = z.object({

})

const weatherSchema = z.object({

})

const F1GPSchema = z.object({
    name: z.string(),
    raceType: z.union([z.literal("normal"), z.literal("sprint")]),
    sessions: z.union([z.object({
        fp1: z.string().transform((str)=>dateFormat(new Date(str), "mmmm dS, yyyy")),
        fp2: z.string().transform((str)=>dateFormat(new Date(str), "mmmm dS, yyyy")),
        fp3: z.string().transform((str)=>dateFormat(new Date(str), "mmmm dS, yyyy")),
        qualifying: z.string().transform((str)=>dateFormat(new Date(str), "mmmm dS, yyyy")),
        race: z.string().transform((str)=>dateFormat(new Date(str), "mmmm dS, yyyy"))
    }), z.object({
        practice: z.string().transform((str)=>dateFormat(new Date(str), "mmmm dS, yyyy")),
        qualifying: z.string().transform((str)=>dateFormat(new Date(str), "mmmm dS, yyyy")),
        sprintQualifying: z.string().transform((str)=>dateFormat(new Date(str), "mmmm dS, yyyy")),
        sprint: z.string().transform((str)=>dateFormat(new Date(str), "mmmm dS, yyyy")),
        race: z.string().transform((str)=>dateFormat(new Date(str), "mmmm dS, yyyy"))
    })]),
    standings: z.object({
        beforeWeekend: standingsSchema,
        afterWeekend: standingsSchema.optional()
    }),
    weather: weatherSchema.optional(),
});

console.log("Test")