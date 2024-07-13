import { Router } from 'express';
import { createDriver } from './driver.controller';

const router: Router = Router();

router.post('/', createDriver);

export default router;
