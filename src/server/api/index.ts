import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { driver } from "../db/schema";

export const appRouter = router({
  drivers: {
    all: publicProcedure.query(async () => {
      const res = await db.query.driver.findMany();

      return res;
    }),
    withID: publicProcedure
    .input(z.object({
      id: z.string()
    }))
    .query(async (opts) => {
      const res = await db.query.driver.findFirst({
        where: eq(driver.id, opts.input.id)
      });

      return res;
    })
  }
});

export type AppRouter = typeof appRouter;
