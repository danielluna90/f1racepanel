import sitemap from "@astrojs/sitemap";

import { defineConfig } from "astro/config";

const url = "https://f1racepanel.com";

export default defineConfig({
  site: url,
  integrations: [sitemap()],
  server: {
    port: 3001,
  }
});
