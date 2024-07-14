import { APIErrorCodes, APIException } from 'lib/middleware';
import { DatabaseTypes, ErrorResponse, ObjectTypes } from 'f1racepanel-common';
import {
  EditDriverParamsSchema,
  GetDriverParamsSchema,
} from './driver.schemas';
import { Request, RequestHandler, Response } from 'express';
import { prisma } from 'lib/prisma';

export const createDriver: RequestHandler = async (
  req: Request<unknown, unknown, ObjectTypes.Driver>,
  res: Response<ErrorResponse | DatabaseTypes.Driver>
) => {
  const driver = await prisma.driver.create({
    data: {
      ...req.body,
    },
  });

  res.status(200).send(driver);
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
      throw new APIException('User not found', APIErrorCodes.USER_NOT_FOUND);
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
      status_code: 404,
      internal_code: APIErrorCodes.USER_NOT_FOUND,
      description: `Could not find driver with DriverID: ${req.params.DriverID}`,
    });

    return;
  }

  res.status(200).send({
    ...driver,
  });
};
