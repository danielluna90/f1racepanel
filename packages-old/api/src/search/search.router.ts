import * as SearchController from './search.controller';
import * as SearchSchemas from './search.schemas';

import { Router } from 'express';
import { ValidateQueries } from 'lib/middleware';

const router: Router = Router();

router.get(
  '/drivers',
  ValidateQueries(SearchSchemas.getDriversQueriesSchema),
  SearchController.getDrivers
);

export default router;
