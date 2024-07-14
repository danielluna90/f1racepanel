import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from 'f1racepanel-common';

export enum APIErrorCodes {
  // Prisma / DB errors (1xxx)
  USER_NOT_FOUND = 1001,

  // Javascript Runtime errors (2xxx)
  JSON_FORMAT_ERROR = 2001,

  // Unknown / Critical errors (9xxx)
  UNKNOWN_ERROR = 9001,
}

export class APIException extends Error {
  msg: string;
  errorCode: APIErrorCodes;

  constructor(msg: string, errorCode: APIErrorCodes) {
    super(msg);

    this.msg = msg;
    this.errorCode = errorCode;
  }
}

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
    throw new APIException('', APIErrorCodes.JSON_FORMAT_ERROR);
  }

  throw new APIException('', APIErrorCodes.UNKNOWN_ERROR);
}

export function APIErrorHandler(
  err: APIException,
  _: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  switch (err.errorCode) {
    case APIErrorCodes.USER_NOT_FOUND:
      res.status(401).send({
        code: 401,
        description: 'User not found',
      });

      break;
    case APIErrorCodes.JSON_FORMAT_ERROR:
      res.status(400).send({
        code: 400,
        description: 'JSON is not correctly formatted',
      });
  }

  next();
}
