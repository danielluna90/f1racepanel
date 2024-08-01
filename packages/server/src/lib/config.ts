import { type ServerConfig, createConfig } from 'express-zod-api';

export const config: ServerConfig = createConfig({
  server: {
    listen: 3000,
  },
  cors: true,
  logger: {
    level: 'debug',
    color: true,
  },
  startupLogo: false,
});
