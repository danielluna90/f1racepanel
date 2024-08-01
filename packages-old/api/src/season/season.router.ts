import * as SeasonController from './season.controller';
import * as SeasonSchemas from './season.schemas';

import { Router } from 'express';
import { ValidateQueries } from 'lib/middleware';

const router: Router = Router();

router.get(
  '/',
  ValidateQueries(SeasonSchemas.getSeasonParamsSchema),
  SeasonController.getSeason
);

export default router;
