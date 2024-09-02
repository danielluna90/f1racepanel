import { DependsOnMethod, type Routing, ServeStatic } from 'express-zod-api';

import {
  createCircuit,
  createCircuitLayout,
  getCircuit,
  getCircuitLayout,
} from 'routes/circuit';
import { createDriver, editDriver, getDriver } from 'routes/driver';
import {
  createGPWeekend,
  getGPWeekendByID,
  getGPWeekendByYearAndRound,
  getLatestGPWeekend,
} from 'routes/session';
import { createSeason, getLatestSeason, getSeason } from 'routes/season';
import { getCircuits, getDrivers } from 'routes/search';

export const routing: Routing = {
  v1: {
    circuit: {
      '': createCircuit,
      ':CircuitID': getCircuit,
      layout: {
        '': createCircuitLayout,
        ':CircuitLayoutID': getCircuitLayout,
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
      // Order Matters, this takes precedent over ':SessionID' wildcard route!
      latest: getLatestGPWeekend,
      ':SessionID': getGPWeekendByID,
    },
    search: {
      drivers: getDrivers,
      circuits: getCircuits,
    },
    season: {
      '': createSeason,
      latest: getLatestSeason,
      ':year': {
        '': getSeason,
        ':round': {
          '': getGPWeekendByYearAndRound,
          ':session': createSeason,
        },
      },
    },
  },
  docs: new ServeStatic('src/static'),
};
