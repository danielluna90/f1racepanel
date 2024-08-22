import { DependsOnMethod, type Routing, ServeStatic } from 'express-zod-api';

import { createDriver, editDriver, getDriver } from 'routes/driver';
import { createCircuit } from 'routes/circuit';
import { getDrivers } from 'routes/search';

export const routing: Routing = {
  v1: {
    circuit: {
      '': createCircuit,
      layout: {
        '': createCircuit,
      },
    },
    driver: {
      '': createDriver,
      ':DriverID': new DependsOnMethod({
        get: getDriver,
        post: editDriver,
      }),
    },
    search: {
      drivers: getDrivers,
    },
  },
  docs: new ServeStatic('src/static'),
};
