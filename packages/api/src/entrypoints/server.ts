import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT) : undefined;

import { initializeWebServer } from '../index';

initializeWebServer(port);
