import { Driver, ErrorResponse } from 'f1racepanel-common';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { prisma } from 'lib/prisma';

export const createDriver: RequestHandler = async (
  req: Request<unknown, unknown, Driver>,
  res: Response<ErrorResponse | Driver>,
  next: NextFunction
) => {
  const driver = await prisma.driver
    .create({
      data: {
        ...req.body,
      },
    })
    .catch((error: unknown) => {
      next(error);

      return null;
    });

  if (driver) res.status(200).send(driver);
};
