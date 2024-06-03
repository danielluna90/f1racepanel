import express, { Request, Response } from "express";
const DriverRoutes = express.Router();

import { prisma, Prisma } from "./prisma";

import z from "zod";
import { fromZodError } from "zod-validation-error";

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

DriverRoutes.post(
  "/",
  async (
    req: Request,
    res: Response<z.infer<typeof ErrorResponse> | z.infer<typeof Driver>, {}>
  ) => {
    const driverData = Driver.omit({ id: true }).safeParse(req.body);

    if (driverData.success == false) {
      res.status(400).send({
        code: 400,
        description: fromZodError(driverData.error).toString(),
      });

      return;
    }

    const driver = await prisma.driver.create({
      data: {
        ...driverData.data,
      },
    });

    res.status(200).send(driver);
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

    res.status(200).send({
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

    const driverData = Driver.omit({ id: true }).partial().safeParse(req.body);

    if (driverData.success == false) {
      res.status(400).send({
        code: 400,
        description: fromZodError(driverData.error).toString(),
      });

      return;
    }

    const driver = await prisma.driver
      .update({
        where: {
          id: driverID,
        },
        data: {
          ...driverData.data,
        },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code == "P2025") {
            res.status(404).send({
              code: 404,
              description: `Could not find driver with DriverID: ${driverID}`,
            });
          } else {
            res.status(500).send({
              code: 500,
              description: `Unknown DB error: ${error.code}`,
            });
          }
        }

        console.log(error);
        return null;
      });

    if (driver != null) {
      res.send(driver);
    }

    res.status(500).send({
      code: 500,
      description: "Unknown Server Error",
    });
  }
);

export default DriverRoutes;
