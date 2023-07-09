import sitemap from '@astrojs/sitemap';

import { defineConfig, sharpImageService } from 'astro/config';

const url = "https://f1racepanel.com"

export default defineConfig({
    site: url,
    integrations: [
        sitemap()
    ],
    experimental: {
        assets: true
    },
    image: {
        service: sharpImageService()
    },
    server: {
        port: 3001
    }
});
