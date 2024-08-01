import type { Routing } from 'express-zod-api';
import { helloWorldEndpoint } from './createServerFactory';

export const routing: Routing = {
  v1: {
    hello: helloWorldEndpoint,
  },
};
