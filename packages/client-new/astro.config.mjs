import sitemap from "@astrojs/sitemap";

import { defineConfig, envField } from 'astro/config';

const url = "https://f1racepanel.com";

// https://astro.build/config
export default defineConfig({
  site: url,
  integrations: [sitemap()],
  experimental: {
    env: {
      schema: {
        API_URL: envField.string({
          context: 'server',
          access: 'secret',
          default: ""
        })
      }
    }
  }
});
