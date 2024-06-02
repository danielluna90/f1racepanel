import express, { Request, Response } from "express";
const DriverRoutes = express.Router();

import { PrismaClient } from "f1racepanel-common";
const prisma = new PrismaClient();

DriverRoutes.get("/", (req: Request, res: Response) => {
  res.send("Hellooooo!");
});

DriverRoutes.get("/:DriverID", (req: Request, res: Response) => {});

export default DriverRoutes;
