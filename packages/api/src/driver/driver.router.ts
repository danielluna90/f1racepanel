import { ObjectTypes } from 'f1racepanel-common';
import { Router } from 'express';
import { Validate } from 'lib/middleware';
import { createDriver } from './driver.controller';

const router: Router = Router();

router.post('/', Validate(ObjectTypes.Driver), createDriver);

export default router;
