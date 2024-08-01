import { type Routing, ServeStatic } from 'express-zod-api';

export const routing: Routing = {
  v1: {
    circuit: {},
    driver: {},
    search: {},
  },
  docs: new ServeStatic('src/static'),
};
