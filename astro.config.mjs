import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import F1RacePanelServer from "./src/integrations/api-server.ts";

import { defineConfig, envField } from 'astro/config';

const url = "https://f1racepanel.com";

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
        default: ""
      })
    }
  }
});
