import { defineCollection } from 'astro:content';

import { gpSchema, metadataSchema } from './schemas';

const gpCollection = defineCollection({
    type: 'data',
    schema: gpSchema
})

const metadataCollection = defineCollection({
    type: 'data',
    schema: metadataSchema
})

export const collections = {
    'gpData': gpCollection,
    'metadata': metadataCollection
}