import { type ServerConfig, createConfig } from 'express-zod-api';

import express from 'express';

export const config: ServerConfig = createConfig({
  server: {
    listen: 3000,
    beforeRouting: ({ app }) => {
      app.use('/docs', express.static('src/static'));
    },
  },
  cors: true,
  logger: {
    level: 'debug',
    color: true,
  },
  startupLogo: false,
});
