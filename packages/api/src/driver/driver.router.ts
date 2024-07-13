import { Driver } from 'f1racepanel-common';
import { Router } from 'express';
import { Validate } from 'lib/middleware';
import { createDriver } from './driver.controller';
import { z } from 'zod';

const router: Router = Router();

router.post(
  '/',
  Validate(z.object({ body: Driver.omit({ id: true }) })),
  createDriver
);

export default router;
