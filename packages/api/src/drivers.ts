import express, { Request, Response } from "express";
const DriverRoutes = express.Router();

import { prisma } from "./prisma";

DriverRoutes.get("/", async (req: Request, res: Response) => {
  const drivers = await prisma.driver.findMany();

  res.send(drivers);
});

DriverRoutes.get("/:DriverID", async (req: Request, res: Response) => {
  const driverID = req.params.DriverID;

  const driver = await prisma.driver.findUnique({
    where: {
      id: driverID,
    },
  });

  res.send(driver);
});

DriverRoutes.post("/:DriverID", async (req: Request, res: Response) => {
  const driverID = req.params.DriverID;

  const driver = await prisma.driver.create({
    data: {
      name: "Test Driver",
      dob: "06-02-2024",
      nationality: "US",
    },
  });

  res.send(driver);
});

export default DriverRoutes;
