import * as DriversController from './drivers.controller';
import * as DriversSchemas from './drivers.schemas';

import { Router } from 'express';
import { ValidateQueries } from 'lib/middleware';

const router: Router = Router();

router.get(
  '/',
  ValidateQueries(DriversSchemas.getDriversQueriesSchema),
  DriversController.getDrivers
);

export default router;
