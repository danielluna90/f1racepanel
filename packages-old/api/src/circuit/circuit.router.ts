import * as CircuitController from 'circuit/circuit.controller';
import { Router } from 'express';

const router: Router = Router();

router.post('/', CircuitController.createPost);

export default router;
