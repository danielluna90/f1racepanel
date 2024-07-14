import { APIErrorCodes, APIException } from './lib';
import { ErrorResponse, Prisma } from 'f1racepanel-common';
import { NextFunction, Request, Response } from 'express';
import { ProcessPrismaErrorHandler } from './prisma';

export function CaughtErrorHandler(
  err: unknown,
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  if (err instanceof APIException) {
    next(err);
  }

  if (err instanceof SyntaxError) {
    throw new APIException(
      'JSON Syntax Error.',
      APIErrorCodes.JSON_FORMAT_ERROR
    );
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    ProcessPrismaErrorHandler(err);
  }

  throw new APIException('Unknown Error.', APIErrorCodes.UNKNOWN_ERROR);
}

export function APIErrorHandler(
  err: APIException,
  _: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  switch (err.errorCode) {
    // 1xxx
    case APIErrorCodes.USER_NOT_FOUND:
      res.status(400).send({
        code: 400,
        description: 'User not found.',
      });

      break;

    // 2xxx
    case APIErrorCodes.UNIQUE_FIELD_NOT_UNIQUE:
      res.status(400).send({
        code: 400,
        description: 'Unique field is not unique.',
      });

      break;

    // 3xxx
    case APIErrorCodes.JSON_FORMAT_ERROR:
      res.status(400).send({
        code: 400,
        description: 'JSON is not correctly formatted.',
      });

      break;

    // 9xxx
    default:
      res.status(500).send({
        code: 500,
        description: 'Unprocessed API Error',
      });
  }

  next();
}
