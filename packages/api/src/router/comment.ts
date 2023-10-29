import { createTRPCRouter, protectedProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  getComments: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.comment.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
});
