import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from 'f1racepanel-common';

export enum APIErrorCodes {
  USER_NOT_FOUND = 1001,
  JSON_FORMAT_ERROR = 2000,

  UNKNOWN_ERROR = 9000,
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

export function APIErrorHandler(
  err: APIException | SyntaxError,
  _: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  let errObj: APIException | undefined;

  if (err instanceof APIException) {
    errObj = err;
  } else if (err instanceof SyntaxError) {
    errObj = new APIException('', APIErrorCodes.JSON_FORMAT_ERROR);
  } else {
    errObj = new APIException('', APIErrorCodes.UNKNOWN_ERROR);
  }

  switch (errObj.errorCode) {
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
