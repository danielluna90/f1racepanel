import { defaultEndpointsFactory } from 'express-zod-api';
import { z } from 'zod';

import express from 'express';

export const factory = defaultEndpointsFactory.addExpressMiddleware(express.json());

export const helloWorldEndpoint = factory.build({
  method: "get", // or methods: ["get", "post", ...]
  input: z.object({
    // for empty input use z.object({})
    name: z.string().optional(),
  }),
  output: z.object({
    greetings: z.string(),
  }),
  handler: async ({ input: { name }, options, logger }) => {
    logger.debug("Options:", options); // middlewares provide options
    return { greetings: `Hello, ${name || "World"}. Happy coding!` };
  },
});
