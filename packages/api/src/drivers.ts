import express, { Request, Response } from "express";
const DriverRoutes = express.Router();

import { prisma } from "./prisma";

import z from "zod";

import { ErrorResponse, Driver } from "f1racepanel-common/src/types";

DriverRoutes.get(
  "/",
  async (
    req: Request,
    res: Response<z.infer<typeof ErrorResponse> | z.infer<typeof Driver>[], {}>
  ) => {
    const drivers = await prisma.driver.findMany();

    res.send(drivers);
  }
);

DriverRoutes.get(
  "/:DriverID",
  async (
    req: Request,
    res: Response<z.infer<typeof ErrorResponse> | z.infer<typeof Driver>, {}>
  ) => {
    const driverID = req.params.DriverID;

    const driver = await prisma.driver.findUnique({
      where: {
        id: driverID,
      },
    });

    if (driver == null) {
      res.status(404).send({
        code: 404,
        description: `Could not find driver with DriverID: ${driverID}`,
      });

      return;
    }

    res.send({
      ...driver,
    });
  }
);

DriverRoutes.post(
  "/:DriverID",
  async (
    req: Request,
    res: Response<z.infer<typeof ErrorResponse> | z.infer<typeof Driver>, {}>
  ) => {
    const driverID = req.params.DriverID;

    const driver = await prisma.driver.create({
      data: {
        name: "Test Driver",
        dob: "06-02-2024",
        nationality: "US",
      },
    });

    if (driver == null) {
      res.status(404).send({
        code: 404,
        description: `Could not find driver with DriverID: ${driverID}`,
      });

      return;
    }

    res.send(driver);
  }
);

export default DriverRoutes;
