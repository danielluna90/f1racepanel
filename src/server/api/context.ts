import { db } from "../db";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    db,
    ...opts
  };
};
