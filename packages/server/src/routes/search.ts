import { ResponseTypes } from 'types';
import { endpointFactory } from 'lib/createServerFactory';
import { prisma } from 'lib/prisma';
import z from 'zod';

export const getDriversQueriesSchema = z.object({
  limit: z.coerce.number().int().min(1).default(25),
  offset: z.coerce.number().int().min(0).default(0),
});

export const getDrivers = endpointFactory.build({
  method: 'get',
  input: getDriversQueriesSchema,
  output: ResponseTypes.Drivers,
  handler: async ({ input }) => {
    const drivers = await prisma.driver.findMany();

    return {
      href: 'http://localhost:3000/v1/drivers',
      limit: input.limit,
      next: null,
      offset: input.offset,
      items: drivers,
    };
  },
});

export const getCircuits = endpointFactory.build({
  method: 'get',
  input: getDriversQueriesSchema,
  output: ResponseTypes.Circuits,
  handler: async ({ input }) => {
    const circuits = await prisma.circuit.findMany();

    return {
      href: 'http://localhost:3000/v1/circuits',
      limit: input.limit,
      next: null,
      offset: input.offset,
      items: circuits,
    };
  },
});
