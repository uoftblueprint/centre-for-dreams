import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const likeRouter = createTRPCRouter({
  likePost: protectedProcedure
    .input(
      z.object({
        postId: z.number().nonnegative(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.likes.create({
        data: {
          postId: input.postId,
          userId: ctx.userId,
        },
      });
    }),
  unlikePost: protectedProcedure
    .input(
      z.object({
        postId: z.number().nonnegative(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.likes.deleteMany({
        where: {
          postId: input.postId,
          userId: ctx.userId,
        },
      });
    }),
});
