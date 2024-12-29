import { publicProcedure, router } from '../trpc';

import { db } from '../../db';

export const circuitsRouter = router({
  all: publicProcedure.query(async () => {
    const res = await db.query.circuit.findMany({
      with: {
        layouts: true,
      },
    });

    return res;
  }),
});
