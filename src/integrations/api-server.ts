import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "../server/api";
import type { AstroIntegration } from "astro";

const plugin = (): AstroIntegration => {
  return {
    name: "@f1racepanel/server-astro-integration",
    hooks: {
      'astro:config:done': async () => {
        const server = createHTTPServer({
          router: appRouter,
        });
        
        server.listen(3000);
      },
    }
  };
}

export default plugin;
