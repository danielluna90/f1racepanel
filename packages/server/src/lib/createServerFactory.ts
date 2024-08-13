import { EndpointsFactory, ResultHandler } from 'express-zod-api';
import { ErrorResponse } from 'types';
import { generateErrorResponse } from 'middleware/errorHandling/errorHandlers';

const resHandler = new ResultHandler({
  positive: output => ({
    schema: output,
    mimeType: 'application/json',
  }),
  negative: ErrorResponse,
  handler: ({ error, output, response }) => {
    if (!error) {
      response.status(200).send(output);

      return;
    }

    const errorResponse = generateErrorResponse(error);

    response.status(errorResponse.status_code).send(errorResponse);
  },
});

export const endpointFactory = new EndpointsFactory(resHandler); //.addExpressMiddleware(express.json());
