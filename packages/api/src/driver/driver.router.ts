import * as DriverController from './driver.controller';
import * as DriverSchemas from './driver.schemas';

import { ValidateBody, ValidateParams } from 'lib/middleware';
import { ObjectTypes } from 'f1racepanel-common';
import { Router } from 'express';

const router: Router = Router();

router.post(
  '/',
  ValidateBody(ObjectTypes.Driver),
  DriverController.createDriver
);

router.post(
  '/:DriverID',
  ValidateParams(DriverSchemas.editDriverParamsSchema),
  ValidateBody(ObjectTypes.Driver, false),
  DriverController.editDriver
);

export default router;
