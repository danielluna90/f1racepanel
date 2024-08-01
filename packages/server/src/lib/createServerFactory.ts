import { defaultEndpointsFactory } from 'express-zod-api';
import express from 'express';
import { z } from 'zod';

export const factory = defaultEndpointsFactory.addExpressMiddleware(
  express.json()
);

export const helloWorldEndpoint = factory.build({
  method: 'get', // or methods: ["get", "post", ...]
  input: z.object({
    // for empty input use z.object({})
    name: z.string().optional(),
  }),
  output: z.object({
    greetings: z.string(),
  }),
  handler: async ({ input: { name }, options, logger }) => {
    await logger.debug('Options:', options); // middlewares provide options
    return { greetings: `Hello, ${name ?? 'World'}. Happy coding!` };
  },
});
