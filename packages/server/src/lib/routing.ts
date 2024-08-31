import { DependsOnMethod, type Routing, ServeStatic } from 'express-zod-api';

import { createCircuit, createCircuitLayout, getCircuit } from 'routes/circuit';
import { createDriver, editDriver, getDriver } from 'routes/driver';
import { getCircuits, getDrivers } from 'routes/search';
import { createSeason } from 'routes/season';

export const routing: Routing = {
  v1: {
    circuit: {
      '': createCircuit,
      ':CircuitID': getCircuit,
      layout: {
        '': createCircuitLayout,
        ':CircuitLayoutID': createCircuitLayout,
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
      circuits: getCircuits,
    },
    season: {
      '': createSeason,
      ':year': {
        '': createSeason,
        ':round': {
          '': createSeason,
          ':session': createSeason,
        },
      },
    },
  },
  docs: new ServeStatic('src/static'),
};
