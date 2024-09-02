import { APIErrorCodes } from 'types';

export class APIException extends Error {
  msg: string;
  errorCode: APIErrorCodes;

  constructor(msg: string, errorCode: APIErrorCodes) {
    super(msg);

    this.msg = msg;
    this.errorCode = errorCode;
  }
}

export function getAPIExceptionStatusCode(errorCode: APIErrorCodes): number {
  switch (errorCode) {
    // Status Code: 400 (Bad Request)
    case APIErrorCodes.UNIQUE_FIELD_NOT_UNIQUE:
    case APIErrorCodes.JSON_FORMAT_ERROR:
    case APIErrorCodes.SCHEMA_VALIDATION_FAILED:
      return 400;

    // Status Code: 401 (Unauthorized)

    // Status Code: 403 (Forbidden)

    // Status Code: 404 (Not Found)
    case APIErrorCodes.USER_NOT_FOUND:
    case APIErrorCodes.SEASON_NOT_FOUND:
    case APIErrorCodes.ENTITY_NOT_FOUND:
    case APIErrorCodes.LATEST_WEEKEND_UNAVAILABLE:
    case APIErrorCodes.UNIMPLEMENTED:
      return 404;

    // Status Code: 500 (Internal Server Error)
    case APIErrorCodes.QUERY_SCHEMA_MISFORMED:
    case APIErrorCodes.UNKNOWN_ERROR:
    case APIErrorCodes.PRISMA_UNKNOWN_ERROR:
    default:
      return 500;
  }
}
