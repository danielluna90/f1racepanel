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
