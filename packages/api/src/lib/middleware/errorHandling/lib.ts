import { ErrorResponse } from 'f1racepanel-common';
import { Response } from 'express';

export enum APIErrorCodes {
  // Prisma / DB Custom errors (1xxx)
  USER_NOT_FOUND = 1001,

  // Prisma / DB Generic errors (2xxx)
  UNIQUE_FIELD_NOT_UNIQUE = 2001,
  ENTITY_NOT_FOUND = 2002,

  // Javascript Runtime errors (3xxx)
  JSON_FORMAT_ERROR = 3001,

  // API Errors (4xxx)
  SCHEMA_VALIDATION_FAILED = 4001,
  QUERY_SCHEMA_MISFORMED = 4002,

  // Unknown / Critical errors (9xxx)
  UNKNOWN_ERROR = 9001,
  PRISMA_UNKNOWN_ERROR = 9002,
}

export class APIException extends Error {
  msg: string;
  errorCode: APIErrorCodes;

  constructor(msg: string, errorCode: APIErrorCodes) {
    super(msg);

    this.msg = msg;
    this.errorCode = errorCode;
  }

  sendResponseWithStatus(
    res: Response<ErrorResponse>,
    statusCode: number
  ): void {
    res.status(statusCode).send({
      status_code: statusCode,
      internal_code: this.errorCode,
      description: this.msg,
    });
  }
}
