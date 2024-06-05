import express from 'express';

import APIRouter from './src/api.ts';
import { prisma } from './src/prisma.ts';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.disable('x-powered-by');

app.use(express.json());

app.use('/v1', APIRouter);
app.use('/docs', express.static('docs'));

app
  .listen(port, () => {
    console.log('Server running at PORT: ', port);
  })
  .on('error', async error => {
    // gracefully handle error
    await prisma.$disconnect();
    throw new Error(error.message);
  })
  .on('close', async () => {
    await prisma.$disconnect();
  });
