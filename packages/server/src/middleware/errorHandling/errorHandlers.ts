import { APIErrorCodes, APIException, getAPIExceptionStatusCode } from './lib';
import { ErrorResponse } from 'types';
import { InputValidationError } from 'express-zod-api';
import { Prisma } from '@prisma/client';
import { ProcessPrismaErrorHandler } from './prisma';

export function generateErrorResponse(err: unknown): ErrorResponse {
  if (err instanceof APIException) {
    return {
      status_code: getAPIExceptionStatusCode(err.errorCode),
      internal_code: err.errorCode,
      description: err.msg,
    };
  } else if (err instanceof SyntaxError) {
    return {
      status_code: getAPIExceptionStatusCode(APIErrorCodes.JSON_FORMAT_ERROR),
      internal_code: APIErrorCodes.JSON_FORMAT_ERROR,
      description: 'JSON Syntax Error.',
    };
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return ProcessPrismaErrorHandler(err);
  } else if (err instanceof InputValidationError) {
    // TODO: Use err.message;
    return {
      status_code: getAPIExceptionStatusCode(
        APIErrorCodes.SCHEMA_VALIDATION_FAILED
      ),
      internal_code: APIErrorCodes.SCHEMA_VALIDATION_FAILED,
      description: 'Input Invalid.',
    };
  } else {
    console.log(err);

    return {
      status_code: getAPIExceptionStatusCode(APIErrorCodes.UNKNOWN_ERROR),
      internal_code: APIErrorCodes.UNKNOWN_ERROR,
      description: 'Unknown Error.',
    };
  }
}
