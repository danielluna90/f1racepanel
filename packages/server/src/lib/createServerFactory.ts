import { defaultEndpointsFactory } from 'express-zod-api';
import express from 'express';

export const endpointFactory = defaultEndpointsFactory.addExpressMiddleware(
  express.json()
);
