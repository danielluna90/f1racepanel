/* Todo: Scrap all legacy API code and rename this file to api.ts */

import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../server/api';
import type { inferRouterOutputs } from '@trpc/server';

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});

export type RouterOutput = inferRouterOutputs<AppRouter>;
