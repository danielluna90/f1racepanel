import express from 'express';
const APIRouter = express.Router();

import DriverRoutes from './drivers.ts';
import CircuitRoutes from './circuits.ts';
import GPRoutes from './gp.ts';
import ErrorHandler from './errorHandler.ts';

APIRouter.use('/drivers', DriverRoutes);
APIRouter.use('/circuits', CircuitRoutes);
APIRouter.use('/gp', GPRoutes);
// APIRouter.use("/season");
// APIRouter.use("/session");
// APIRouter.use("/login");

APIRouter.use(ErrorHandler);

export default APIRouter;
