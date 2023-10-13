import { createTRPCRouter, publicProcedure } from "../trpc";

export const developerRouter = createTRPCRouter({
  count: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.developers.count();
  }),
});
