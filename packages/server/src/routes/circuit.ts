import { InputTypes, ResponseTypes } from 'types';
import { endpointFactory } from 'lib/createServerFactory';
import { prisma } from 'lib/prisma';

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
