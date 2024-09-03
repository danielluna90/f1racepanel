import { APIErrorCodes, APIException } from 'lib/middleware';
import { ErrorResponse, ResponseTypes } from 'f1racepanel-common';
import { Request, RequestHandler, Response } from 'express';
import { GetSeasonsParamsSchema } from './season.schemas';
import { prisma } from 'lib/prisma';

export const getSeason: RequestHandler<
  unknown,
  unknown,
  unknown,
  never
> = async (
  req: Request<unknown, unknown, unknown, GetSeasonsParamsSchema>,
  res: Response<ErrorResponse | ResponseTypes.Season>
) => {
  const season = await prisma.season.findUnique({
    where: {
      year: req.query.Year,
    },
    include: {
      drivers: true,
    },
  });

  if (!season) {
    throw new APIException(
      `${req.query.Year.toString()} Season was not found.`,
      APIErrorCodes.SEASON_NOT_FOUND
    );
  }

  const rv: ResponseTypes.Season = {
    ...season,
    drivers: season.drivers.map(driver => driver.id),
    point_system: {
      awards_extra_point_for_fastest_lap_t10: true,
    },
  };

  res.status(200).send(rv);
};
