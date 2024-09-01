import { APIErrorCodes, DatabaseTypes, InputTypes, ResponseTypes } from 'types';
import { APIException } from 'middleware/errorHandling';
import { endpointFactory } from 'lib/createServerFactory';
import { prisma } from 'lib/prisma';
import { z } from 'zod';

export const createSeason = endpointFactory.build({
  method: 'post',
  input: InputTypes.Season,
  output: ResponseTypes.Season,
  handler: async ({ input }) => {
    const season = await prisma.season.create({
      data: {
        ...input,
      },
      include: {
        weekends: true,
      },
    });

    return season;
  },
});

export const getSeason = endpointFactory.build({
  method: 'get',
  input: z.object({
    year: z.coerce.number(),
  }),
  output: ResponseTypes.Season.and(
    z.object({
      weekends: DatabaseTypes.GPWeekend.array().min(1),
    })
  ),
  handler: async ({ input }) => {
    const season = await prisma.season.findUnique({
      where: {
        year: input.year,
      },
      include: {
        weekends: true,
      },
    });

    if (!season) {
      throw new APIException(
        'Season not Found',
        APIErrorCodes.ENTITY_NOT_FOUND
      );
    }

    return season;
  },
});
