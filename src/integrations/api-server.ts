import type { AstroIntegration } from 'astro';

import { appRouter } from '../server/api';
import { createContext } from '../server/api/context';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const plugin = (): AstroIntegration => {
  return {
    name: '@f1racepanel/server-astro-integration',
    hooks: {
      // 'astro:config:setup': ({ config, addWatchFile }) => {
      //   addWatchFile(new URL('./src/server/api/index.ts', config.root));
      // },
      'astro:config:done': () => {
        const server = createHTTPServer({
          router: appRouter,
          createContext,
        });

        server.listen(3000);
      },
    },
  };
};

export default plugin;
