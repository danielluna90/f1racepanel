import { initTRPC } from "@trpc/server";
import type { createTRPCContext } from "./context";

const t = initTRPC.context<typeof createTRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
