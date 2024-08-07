import { AddressInfo, Server } from 'net';
import APIRouter from './routes/api.ts';
import express from 'express';
import { prisma } from './routes/utils/prisma.ts';

export let connection: Server;

/**
 * This initializes the web server and does initial setup of ExpressJS. It setups our middleware and also our routes.
 *
 * @param port - Port to attempt to use. If, not available, a random port will be assigned.
 * @returns Port of the server.
 */
export const initializeWebServer = (port?: number): number => {
  const app = express();

  app.disable('x-powered-by');

  app.use(express.json());

  app.use('/v1', APIRouter);
  app.use('/docs', express.static('src/static'));

  connection = app
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

  return port ? port : 80;
};
