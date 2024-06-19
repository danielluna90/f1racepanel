import express from 'express';

import APIRouter from './routes/api.ts';
import { prisma } from './routes/utils/prisma.ts';

import { Server, AddressInfo } from 'net';

export let connection: Server;

export const initializeWebServer = (port?: number): number | undefined => {
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

  return port;
};
