import { z, defineCollection } from 'astro:content';

const gpCollection = defineCollection({
    type: 'data',
    schema: z.object({
        name: z.string()
    })
})

export const collections = {
    '2023': gpCollection
}