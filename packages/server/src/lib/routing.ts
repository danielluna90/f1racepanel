import { DependsOnMethod, type Routing, ServeStatic } from 'express-zod-api';

import { createCircuit, createCircuitLayout, getCircuit } from 'routes/circuit';
import { createDriver, editDriver, getDriver } from 'routes/driver';
import { getCircuits, getDrivers } from 'routes/search';
import { createGPWeekend } from 'routes/session';
import { createSeason, getSeason } from 'routes/season';

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
    gpweekend: {
      '': createGPWeekend,
    },
    search: {
      drivers: getDrivers,
      circuits: getCircuits,
    },
    season: {
      '': createSeason,
      ':year': {
        '': getSeason,
        ':round': {
          '': createSeason,
          ':session': createSeason,
        },
      },
    },
  },
  docs: new ServeStatic('src/static'),
};
