import { type Routing, ServeStatic } from 'express-zod-api';

import { createDriver } from 'routes/driver';

export const routing: Routing = {
  v1: {
    circuit: {},
    driver: {
      '': createDriver,
    },
    search: {},
  },
  docs: new ServeStatic('src/static'),
};
