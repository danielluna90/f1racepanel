import express from "express";
const APIRouter = express.Router();

import DriverRoutes from "./drivers.ts";

APIRouter.use("/drivers", DriverRoutes);
// APIRouter.use("/circuits");
// APIRouter.use("/gp");
// APIRouter.use("/season");
// APIRouter.use("/session");

export default APIRouter;
