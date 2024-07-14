import { APIErrorCodes, APIException } from 'lib/middleware';
import { DatabaseTypes, ErrorResponse, ObjectTypes } from 'f1racepanel-common';
import {
  EditDriverParamsSchema,
  GetDriverParamsSchema,
} from './driver.schemas';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { prisma } from 'lib/prisma';

export const createDriver: RequestHandler = async (
  req: Request<unknown, unknown, ObjectTypes.Driver>,
  res: Response<ErrorResponse | DatabaseTypes.Driver>,
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

export const editDriver: RequestHandler<EditDriverParamsSchema> = async (
  req: Request<EditDriverParamsSchema, unknown, ObjectTypes.Driver>,
  res: Response<ErrorResponse | DatabaseTypes.Driver>
) => {
  const driver = await prisma.driver
    .update({
      where: {
        id: req.params.DriverID,
      },
      data: {
        ...req.body,
      },
    })
    .catch(() => {
      throw new APIException('', APIErrorCodes.USER_NOT_FOUND);
    });

  res.send(driver);
};

export const getDriver: RequestHandler<GetDriverParamsSchema> = async (
  req: Request<GetDriverParamsSchema, unknown, unknown>,
  res: Response<ErrorResponse | DatabaseTypes.Driver>
) => {
  const driver = await prisma.driver.findUnique({
    where: {
      id: req.params.DriverID,
    },
  });

  if (driver == null) {
    res.status(404).send({
      code: 404,
      description: `Could not find driver with DriverID: ${req.params.DriverID}`,
    });

    return;
  }

  res.status(200).send({
    ...driver,
  });
};
