import { publicProcedure, router } from '../../trpc';

import { circuitLayout } from '../../../db/schema';
import { db } from '../../../db';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export const circuitLayoutRouter = router({
  byID: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async opts => {
      const res = await db.query.circuitLayout.findFirst({
        where: eq(circuitLayout.id, opts.input.id),
      });

      return res;
    }),
});
