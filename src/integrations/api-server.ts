import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "../server/api";
import type { AstroIntegration } from "astro";
import { createContext } from "../server/api/context"

const plugin = (): AstroIntegration => {
  return {
    name: "@f1racepanel/server-astro-integration",
    hooks: {
      'astro:config:done': () => {
        const server = createHTTPServer({
          router: appRouter,
          createContext,
        });
        
        server.listen(3000);
      },
    }
  };
}

export default plugin;
