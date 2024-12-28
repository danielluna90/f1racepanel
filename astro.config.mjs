import { defineConfig, envField } from 'astro/config';

import F1RacePanelServer from './src/integrations/api-server.ts';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

const url = 'https://f1racepanel.com';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: url,
  srcDir: './src/client',
  integrations: [sitemap(), tailwind(), react(), F1RacePanelServer()],
  env: {
    schema: {
      API_URL: envField.string({
        context: 'server',
        access: 'secret',
        default: '',
      }),
    },
  },
});
