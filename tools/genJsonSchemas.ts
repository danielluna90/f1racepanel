import { gpSchema, metadataSchema } from '../src/content/schemas.ts';

import { zodToJsonSchema } from "zod-to-json-schema";

import * as fs from 'node:fs';

if (!fs.existsSync('./schemas')) {
    fs.mkdirSync('./schemas')
}

fs.writeFileSync('./schemas/gpSchema.json', JSON.stringify(zodToJsonSchema(gpSchema, "gpSchema")), { flag: 'w+' })
fs.writeFileSync('./schemas/metadataSchema.json', JSON.stringify(zodToJsonSchema(metadataSchema, "metadataSchema")), { flag: 'w+' })