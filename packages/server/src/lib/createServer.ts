import * as DefaultConfig from './config';

import { type AddressInfo, Server } from 'net';
import {
  Documentation,
  type ServerConfig,
  createServer,
} from 'express-zod-api';

import path from 'path';
import { routing } from './routing';

import { writeFileSync } from 'fs';

export let connection: Server;

const serverPath = path.dirname(
  require.resolve('f1racepanel-server/package.json')
);

export const prepareAPIServer = async (config: ServerConfig) => {
  const docFilePath = path.join(
    serverPath,
    'src',
    'static',
    'api',
    'f1racepanel-v1.yml'
  );

  writeFileSync(
    docFilePath,
    new Documentation({
      routing,
      config,
      version: 'v1',
      title: 'F1 Race Panel API',
      serverUrl: 'https://api.f1racepanel.com/v1',
      composition: 'components',
      // descriptions: {
      //   requestBody: props => `Test`,
      // },
    }).getSpecAsYaml(),
    'utf-8'
  );

  return await createServer(config, routing);
};

/**
 * This initializes the web server and does initial setup of ExpressJS. It setups our middleware and also our routes.
 *
 * @param port - Port to attempt to use. If, not available, a random port will be assigned.
 * @returns Port of the server.
 */
export const initializeWebServer = async (port?: number): Promise<number> => {
  if (!port) port = 3000;

  const finalConfig: ServerConfig = {
    ...DefaultConfig.config,
    server: {
      listen: port,
    },
  };

  const server = await prepareAPIServer(finalConfig);

  connection = server.httpServer;

  return (server.httpServer.address() as AddressInfo).port || 0;
};
