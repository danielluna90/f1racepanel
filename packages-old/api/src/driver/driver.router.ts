import * as DriverController from './driver.controller';
import * as DriverSchemas from './driver.schemas';

import { ValidateBody, ValidateParams } from 'lib/middleware';
import { ResponseTypes } from 'f1racepanel-common';
import { Router } from 'express';

const router: Router = Router();

router.post(
  '/',
  ValidateBody(ResponseTypes.Driver),
  DriverController.createDriver
);

router.post(
  '/:DriverID',
  ValidateParams(DriverSchemas.editDriverParamsSchema),
  ValidateBody(ResponseTypes.Driver, false),
  DriverController.editDriver
);

router.get(
  '/:DriverID',
  ValidateParams(DriverSchemas.getDriverParamsSchema),
  DriverController.getDriver
);

export default router;
