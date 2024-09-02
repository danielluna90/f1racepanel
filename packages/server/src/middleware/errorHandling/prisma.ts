import { APIErrorCodes, type ErrorResponse } from 'types';
import { Prisma } from '@prisma/client';
import { getAPIExceptionStatusCode } from './lib';

export function ProcessPrismaErrorHandler(
  err: Prisma.PrismaClientKnownRequestError
): ErrorResponse {
  switch (err.code) {
    case 'P2002':
      return {
        status_code: getAPIExceptionStatusCode(
          APIErrorCodes.UNIQUE_FIELD_NOT_UNIQUE
        ),
        internal_code: APIErrorCodes.UNIQUE_FIELD_NOT_UNIQUE,
        description: 'Unique field is not unique.',
      };

    case 'P2025':
      return {
        status_code: getAPIExceptionStatusCode(APIErrorCodes.ENTITY_NOT_FOUND),
        internal_code: APIErrorCodes.ENTITY_NOT_FOUND,
        description: 'Entity not found.',
      };

    default:
      return {
        status_code: getAPIExceptionStatusCode(
          APIErrorCodes.PRISMA_UNKNOWN_ERROR
        ),
        internal_code: APIErrorCodes.PRISMA_UNKNOWN_ERROR,
        description: 'Unhandled Prisma Error.',
      };
  }
}
