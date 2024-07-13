import { Driver, ErrorResponse } from 'f1racepanel-common';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { fromZodError } from 'zod-validation-error';
import { prisma } from 'lib/prisma';

export const createDriver: RequestHandler = async (
  req: Request<unknown, unknown, Driver>,
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
};
