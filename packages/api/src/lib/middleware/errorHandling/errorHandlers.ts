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
  } else if (err instanceof SyntaxError) {
    throw new APIException(
      'JSON Syntax Error.',
      APIErrorCodes.JSON_FORMAT_ERROR
    );
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    ProcessPrismaErrorHandler(err);
  } else {
    console.log(err);

    throw new APIException('Unknown Error.', APIErrorCodes.UNKNOWN_ERROR);
  }
}

export function APIErrorHandler(
  err: APIException,
  _: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  switch (err.errorCode) {
    // Status Code: 400 (Bad Request)
    case APIErrorCodes.UNIQUE_FIELD_NOT_UNIQUE:
    case APIErrorCodes.JSON_FORMAT_ERROR:
    case APIErrorCodes.SCHEMA_VALIDATION_FAILED:
      err.sendResponseWithStatus(res, 400);

      break;

    // Status Code: 401 (Unauthorized)

    // Status Code: 403 (Forbidden)

    // Status Code: 404 (Not Found)
    case APIErrorCodes.USER_NOT_FOUND:
    case APIErrorCodes.ENTITY_NOT_FOUND:
      err.sendResponseWithStatus(res, 404);
      break;

    // Status Code: 500 (Internal Server Error)
    case APIErrorCodes.QUERY_SCHEMA_MISFORMED:
    case APIErrorCodes.UNKNOWN_ERROR:
    case APIErrorCodes.PRISMA_UNKNOWN_ERROR:
    default:
      err.sendResponseWithStatus(res, 500);
      break;
  }

  next();
}
