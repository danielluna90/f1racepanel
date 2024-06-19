import express from 'express';
const APIRouter = express.Router();

import DriverRoutes from './api/drivers.ts';
import CircuitRoutes from './api/circuits.ts';
import GPRoutes from './api/gp.ts';
import ErrorHandler from './utils/errorHandler.ts';

APIRouter.use('/drivers', DriverRoutes);
APIRouter.use('/circuits', CircuitRoutes);
APIRouter.use('/gp', GPRoutes);
// APIRouter.use("/season");
// APIRouter.use("/session");
// APIRouter.use("/login");

APIRouter.use(ErrorHandler);

export default APIRouter;
