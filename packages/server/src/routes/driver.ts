import { DriverSchema } from 'types';

import { endpointFactory } from 'lib/createServerFactory';
import { prisma } from 'lib/prisma';

import z from 'zod';

export const createDriver = endpointFactory.build({
  method: 'post',
  input: DriverSchema.omit({ id: true }),
  output: z.object({}),
  handler: async ({ input }) => {
    const driver = await prisma.driver.create({
      data: {
        ...input,
      },
    });

    return driver;
  },
});
