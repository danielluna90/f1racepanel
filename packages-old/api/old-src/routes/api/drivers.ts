import { Driver, Drivers, ErrorResponse } from 'f1racepanel-common';
import express, { NextFunction, Request, Response } from 'express';
import { fromZodError } from 'zod-validation-error';
import { prisma } from '../utils/prisma';

const DriverRoutes = express.Router();

DriverRoutes.get(
  '/',
  async (_: Request, res: Response<ErrorResponse | Drivers>) => {
    const drivers = await prisma.driver.findMany();

    res.send({
      href: 'http://localhost:3000/v1/drivers',
      limit: 20,
      next: null,
      offset: 0,
      items: drivers,
    });
  }
);

DriverRoutes.post(
  '/',
  async (
    req: Request,
    res: Response<ErrorResponse | Driver>,
    next: NextFunction
  ) => {
    const driverData = Driver.omit({ id: true }).safeParse(req.body);

    if (!driverData.success) {
      res.status(400).send({
        code: 400,
        description: fromZodError(driverData.error).toString(),
      });

      return;
    }

    const driver = await prisma.driver
      .create({
        data: {
          ...driverData.data,
        },
      })
      .catch((error: unknown) => {
        next(error);

        return null;
      });

    if (driver) res.status(200).send(driver);
  }
);

DriverRoutes.get(
  '/:DriverID',
  async (req: Request, res: Response<ErrorResponse | Driver>) => {
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
  '/:DriverID',
  async (
    req: Request,
    res: Response<ErrorResponse | Driver>,
    next: NextFunction
  ) => {
    const driverID = req.params.DriverID;

    const driverData = Driver.omit({ id: true }).partial().safeParse(req.body);

    if (!driverData.success) {
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
      .catch((error: unknown) => {
        next(error);

        return null;
      });

    if (driver) res.send(driver);
  }
);

export default DriverRoutes;
