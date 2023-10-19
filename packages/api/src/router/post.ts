import { createTRPCRouter, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  getPosts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
});
