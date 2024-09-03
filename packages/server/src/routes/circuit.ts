import { APIErrorCodes, InputTypes, ResponseTypes } from 'types';
import { APIException } from 'middleware/errorHandling';
import { endpointFactory } from 'lib/createServerFactory';
import { prisma } from 'lib/prisma';

import z from 'zod';

export const createCircuit = endpointFactory.build({
  method: 'post',
  input: InputTypes.Circuit,
  output: ResponseTypes.Circuit,
  handler: async ({ input }) => {
    const circuit = await prisma.circuit.create({
      data: {
        ...input,
      },
    });

    return circuit;
  },
});

export const getCircuit = endpointFactory.build({
  method: 'get',
  input: z.object({
    CircuitID: z.string().uuid(),
  }),
  output: ResponseTypes.Circuit,
  handler: async ({ input }) => {
    const circuit = await prisma.circuit.findUnique({
      where: {
        id: input.CircuitID,
      },
      include: {
        layouts: true,
      },
    });

    if (!circuit) {
      throw new APIException(
        'Circuit Not Found.',
        APIErrorCodes.ENTITY_NOT_FOUND
      );
    }

    return circuit;
  },
});

export const createCircuitLayout = endpointFactory.build({
  method: 'post',
  input: InputTypes.CircuitLayout.omit({ race_lap_record_id: true }),
  output: ResponseTypes.CircuitLayout,
  handler: async ({ input }) => {
    const layout = await prisma.circuitLayout.create({
      data: {
        ...input,
      },
    });

    return layout;
  },
});

export const getCircuitLayout = endpointFactory.build({
  method: 'get',
  input: z.object({
    CircuitLayoutID: z.string().uuid(),
  }),
  output: ResponseTypes.CircuitLayout,
  handler: async ({ input }) => {
    const layout = await prisma.circuitLayout.findUnique({
      where: {
        id: input.CircuitLayoutID,
      },
    });

    if (!layout) {
      throw new APIException(
        'Layout Not Found.',
        APIErrorCodes.ENTITY_NOT_FOUND
      );
    }

    return layout;
  },
});
