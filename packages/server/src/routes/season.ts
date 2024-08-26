import { InputTypes, ResponseTypes } from 'types';
import { endpointFactory } from 'lib/createServerFactory';
import { prisma } from 'lib/prisma';

export const createSeason = endpointFactory.build({
  method: 'post',
  input: InputTypes.Season,
  output: ResponseTypes.Season,
  handler: async ({ input }) => {
    const season = await prisma.season.create({
      data: {
        ...input,
      },
    });

    return season;
  },
});
