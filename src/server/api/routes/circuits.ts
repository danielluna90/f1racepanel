import { publicProcedure, router } from '../trpc';

import { circuit } from '../../db/schema';
import { circuitLayoutRouter } from './circuit/layout';
import { db } from '../../db';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export const circuitsRouter = router({
  all: publicProcedure.query(async () => {
    const res = await db.query.circuit.findMany({
      with: {
        layouts: true,
      },
    });

    return res;
  }),
  byID: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async opts => {
      const res = await db.query.circuit.findFirst({
        where: eq(circuit.id, opts.input.id),
      });

      return res;
    }),
  layout: circuitLayoutRouter,
});
