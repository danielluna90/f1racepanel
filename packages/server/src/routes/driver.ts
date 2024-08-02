import { DriverSchema } from 'types';

import { endpointFactory } from 'lib/createServerFactory';
import { prisma } from 'lib/prisma';

import z from 'zod';

export const createDriver = endpointFactory.build({
  method: 'post',
  input: DriverSchema.omit({ id: true }),
  output: DriverSchema,
  handler: async ({ input }) => {
    const driver = await prisma.driver.create({
      data: {
        ...input,
      },
    });

    return driver;
  },
});

export const getDriver = endpointFactory.build({
  method: 'get',
  input: z.object({
    // Params
    DriverID: z.string().uuid(),
  }),
  output: DriverSchema,
  handler: async ({ input }) => {
    const driver = await prisma.driver.findUnique({
      where: {
        id: input.DriverID,
      },
    });

    if (!driver) {
      throw new Error(
        `Could not find driver with DriverID: ${input.DriverID}`
        //APIErrorCodes.USER_NOT_FOUND
      );
    }

    console.log(driver);

    return driver;
  },
});

export const editDriver = endpointFactory.build({
  method: 'post',
  input: z
    .object({
      // Params
      DriverID: z.string().uuid(),
    })
    .and(DriverSchema.omit({ id: true }).partial()),
  output: DriverSchema,
  handler: async ({ input }) => {
    const { DriverID, ...body } = input;

    const driver = await prisma.driver.update({
      where: {
        id: DriverID,
      },
      data: {
        ...body,
      },
    });

    return driver;
  },
});
