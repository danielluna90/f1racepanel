import { APIErrorCodes, InputTypes, ParamTypes, ResponseTypes } from 'types';

import { APIException } from 'middleware/errorHandling';
import { endpointFactory } from 'lib/createServerFactory';
import { prisma } from 'lib/prisma';

export const createDriver = endpointFactory.build({
  method: 'post',
  input: InputTypes.Driver,
  output: ResponseTypes.Driver,
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
  input: ParamTypes.DriverID,
  output: ResponseTypes.Driver,
  handler: async ({ input }) => {
    const driver = await prisma.driver.findUnique({
      where: {
        id: input.DriverID,
      },
    });

    if (!driver) {
      throw new APIException(
        `Could not find driver with DriverID: ${input.DriverID}`,
        APIErrorCodes.USER_NOT_FOUND
      );
    }

    return driver;
  },
});

export const editDriver = endpointFactory.build({
  method: 'post',
  input: ParamTypes.DriverID.and(InputTypes.Driver.partial()),
  output: ResponseTypes.Driver,
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
