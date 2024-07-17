import { APIErrorHandler, CaughtErrorHandler } from 'lib/middleware';
import { AddressInfo, Server } from 'net';
import express, { Router } from 'express';
import DriverRouter from 'driver/driver.router';
import SearchRouter from 'search/search.router';
import { prisma } from 'lib/prisma';

export let connection: Server;

export const createAPIServer = (): express.Express => {
  const app = express();

  app.disable('x-powered-by');

  app.use(express.json());

  const APIRouter: Router = express.Router();

  APIRouter.use('/driver', DriverRouter);
  APIRouter.use('/search', SearchRouter);

  app.use('/v1', APIRouter);
  app.use('/docs', express.static('src/static'));
  app.use(CaughtErrorHandler);
  app.use(APIErrorHandler);

  return app;
};

/**
 * This initializes the web server and does initial setup of ExpressJS. It setups our middleware and also our routes.
 *
 * @param port - Port to attempt to use. If, not available, a random port will be assigned.
 * @returns Port of the server.
 */
export const initializeWebServer = (port?: number): number => {
  connection = createAPIServer()
    .listen(port, () => {
      port = (connection.address() as AddressInfo).port;
      console.log('Server running at PORT:', port);
    })
    .on('error', async error => {
      // gracefully handle error
      await prisma.$disconnect();
      throw new Error(error.message);
    })
    .on('close', async () => {
      await prisma.$disconnect();
    });

  return (connection.address() as AddressInfo).port
    ? (connection.address() as AddressInfo).port
    : 0;
};
