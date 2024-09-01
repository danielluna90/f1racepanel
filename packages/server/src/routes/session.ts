import { InputTypes, ResponseTypes } from 'types';
import { endpointFactory } from 'lib/createServerFactory';
import { prisma } from 'lib/prisma';

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
