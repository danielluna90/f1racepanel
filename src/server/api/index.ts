import { z } from "zod";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  userList: publicProcedure
    .input(z.string())
    .query(() => {
      return ["Test", "Test 2"];
    })
});

export type AppRouter = typeof appRouter;
