import { APIErrorCodes, APIException } from 'lib/middleware';
import { DatabaseTypes, ErrorResponse } from 'f1racepanel-common';
import {
  GetDriversQueriesSchema,
  getDriversQueriesSchema,
} from './drivers.schemas';
import { Request, RequestHandler, Response } from 'express';
import { prisma } from 'lib/prisma';

export const getDrivers: RequestHandler<
  unknown,
  unknown,
  unknown,
  never
> = async (
  req: Request<unknown, unknown, unknown, GetDriversQueriesSchema>,
  res: Response<ErrorResponse | DatabaseTypes.Drivers>
) => {
  // This should be safe since the query middleware already parsed and inserted default values.
  const query = getDriversQueriesSchema.safeParse(req.query).data;

  if (!query) {
    throw new APIException(
      'Query was misformed in server.',
      APIErrorCodes.QUERY_SCHEMA_MISFORMED
    );
  }

  const drivers = await prisma.driver.findMany();

  res.send({
    href: 'http://localhost:3000/v1/drivers',
    limit: query.limit,
    next: null,
    offset: query.offset,
    items: drivers,
  });
};
