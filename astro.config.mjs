import { defineConfig, envField } from 'astro/config';

import F1RacePanelServer from './src/integrations/api-server.ts';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const url = 'https://f1racepanel.com';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: url,
  srcDir: './src/client',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap(), react(), F1RacePanelServer()],
  env: {
    schema: {
      POSTGRES_USER: envField.string({
        context: 'server',
        access: 'secret',
      }),
      POSTGRES_PASSWORD: envField.string({
        context: 'server',
        access: 'secret',
      }),
      POSTGRES_DB: envField.string({
        context: 'server',
        access: 'secret',
      }),
      POSTGRES_HOST: envField.string({
        context: 'server',
        access: 'secret',
      }),
    },
    validateSecrets: true,
  },
  server: {
    host: '0.0.0.0',
  },
});
