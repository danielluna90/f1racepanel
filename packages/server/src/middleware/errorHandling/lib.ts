export enum APIErrorCodes {
  // Prisma / DB Custom errors (1xxx)
  USER_NOT_FOUND = 1001,
  SEASON_NOT_FOUND = 1002,

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
  UNIMPLEMENTED = 9003,
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
