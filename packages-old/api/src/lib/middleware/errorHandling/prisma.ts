import { APIErrorCodes, APIException } from './lib';
import { Prisma } from 'f1racepanel-common';

export function ProcessPrismaErrorHandler(
  err: Prisma.PrismaClientKnownRequestError
) {
  switch (err.code) {
    case 'P2002':
      throw new APIException(
        'Unique field is not unique.',
        APIErrorCodes.UNIQUE_FIELD_NOT_UNIQUE
      );

    case 'P2025':
      throw new APIException(
        'Entity not found.',
        APIErrorCodes.ENTITY_NOT_FOUND
      );

    default:
      throw new APIException(
        'Unhandled Prisma Error',
        APIErrorCodes.PRISMA_UNKNOWN_ERROR
      );
  }
}
