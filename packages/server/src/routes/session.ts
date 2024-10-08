import { APIErrorCodes, InputTypes, ResponseTypes } from 'types';
import { APIException } from 'middleware/errorHandling';
import { endpointFactory } from 'lib/createServerFactory';
import { prisma } from 'lib/prisma';

import z from 'zod';

export const createGPWeekend = endpointFactory.build({
  method: 'post',
  input: InputTypes.GPWeekend,
  output: ResponseTypes.GPWeekend,
  handler: async ({ input }) => {
    const weekend = await prisma.gPWeekend.create({
      data: {
        ...input,
      },
    });

    return weekend;
  },
});

export const getGPWeekendByID = endpointFactory.build({
  method: 'get',
  input: z.object({ SessionID: z.string().uuid() }),
  output: ResponseTypes.GPWeekend,
  handler: async ({ input }) => {
    const weekend = await prisma.gPWeekend.findUnique({
      where: {
        id: input.SessionID,
      },
    });

    if (!weekend) {
      throw new APIException(
        'GP Weekend not Found',
        APIErrorCodes.ENTITY_NOT_FOUND
      );
    }

    return weekend;
  },
});

export const getGPWeekendByYearAndRound = endpointFactory.build({
  method: 'get',
  input: z.object({
    year: z.coerce.number(),
    round: z.coerce.number(),
  }),
  output: ResponseTypes.GPWeekend,
  handler: async ({ input }) => {
    const weekend = await prisma.gPWeekend.findUnique({
      where: {
        season_id_round_number: {
          season_id: input.year,
          round_number: input.round,
        },
      },
    });

    if (!weekend) {
      throw new APIException(
        'GP Weekend not Found',
        APIErrorCodes.ENTITY_NOT_FOUND
      );
    }

    return weekend;
  },
});

export const getLatestGPWeekend = endpointFactory.build({
  method: 'get',
  input: z.object({}),
  output: ResponseTypes.GPWeekend,
  handler: async () => {
    const latest = await prisma.gPWeekend.findFirst({
      where: {
        season: {
          is_current_season: true,
        },
        OR: [
          {
            status: 'CURRENT',
          },
          {
            status: 'FUTURE',
          },
        ],
      },
      orderBy: {
        round_number: 'asc',
      },
    });

    if (!latest) {
      throw new APIException(
        'Could not find latest GP Weekend. We could be transitioning to new Season.',
        APIErrorCodes.LATEST_WEEKEND_UNAVAILABLE
      );
    }

    return latest;
  },
});
