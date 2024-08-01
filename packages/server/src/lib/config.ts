import { createConfig, type ServerConfig } from 'express-zod-api';
import express from 'express';

export const config: ServerConfig<string> = createConfig({
  server: {
    listen: 3000,
    beforeRouting: async ({ app }) => {
      app.use('/docs', express.static('src/static'));
    },
  },
  cors: true,
  logger: {
    level: 'debug',
    color: true,
  },
  startupLogo: false
});
