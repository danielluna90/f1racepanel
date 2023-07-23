import { z, defineCollection } from 'astro:content';

const normalGPSchedule = z.object({
    fp1: z.string().transform((str)=>new Date(str)),
    fp2: z.string().transform((str)=>new Date(str)),
    fp3: z.string().transform((str)=>new Date(str)),
    qualifying: z.string().transform((str)=>new Date(str)),
    race: z.string().transform((str)=>new Date(str))
})

const sprint2022GPSchedule = z.object({
    practice: z.string().transform((str)=>new Date(str)),
    qualifying: z.string().transform((str)=>new Date(str)),
    sprint: z.string().transform((str)=>new Date(str)),
    race: z.string().transform((str)=>new Date(str))
})

const sprintGPSchedule = z.object({
    practice: z.string().transform((str)=>new Date(str)),
    qualifying: z.string().transform((str)=>new Date(str)),
    sprintQualifying: z.string().transform((str)=>new Date(str)),
    sprint: z.string().transform((str)=>new Date(str)),
    race: z.string().transform((str)=>new Date(str))
})

const driver = z.object({
    name: z.string(),
    num: z.number(),
    abr: z.string().max(3),
    team: z.string()
})

const gpCollection = defineCollection({
    type: 'data',
    schema: z.object({
        name: z.string(),
        status: z.union([z.literal('Upcoming'), z.literal('Completed'), z.literal('Canceled'), z.literal('TBD')]).default('TBD'),
        schedule: z.union([normalGPSchedule, sprint2022GPSchedule, sprintGPSchedule]).optional(),
        standings: z.array(z.object({pos: z.number(), driverNum: z.number()})).optional()
    })
})

const metadataCollection = defineCollection({
    type: 'data',
    schema: z.object({
        drivers: z.array(driver)
    })
})

export const collections = {
    'gpData': gpCollection,
    'metadata': metadataCollection
}