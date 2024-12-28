import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { db } from "../db";

export function createContext(opts: CreateHTTPContextOptions) {
  return {
    db,
    ...opts
  };
}
 
export type Context = Awaited<ReturnType<typeof createContext>>;
