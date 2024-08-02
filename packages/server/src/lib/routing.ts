import { DependsOnMethod, type Routing, ServeStatic } from 'express-zod-api';

import { createDriver, editDriver, getDriver } from 'routes/driver';

export const routing: Routing = {
  v1: {
    circuit: {},
    driver: {
      '': createDriver,
      ':DriverID': new DependsOnMethod({
        get: getDriver,
        post: editDriver,
      }),
    },
    search: {},
  },
  docs: new ServeStatic('src/static'),
};
