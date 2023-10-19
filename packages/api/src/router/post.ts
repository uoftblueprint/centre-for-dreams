import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  getPosts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
});
