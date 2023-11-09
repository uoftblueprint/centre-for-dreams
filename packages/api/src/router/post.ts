import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  getPosts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string().trim().min(1).max(300),
        contents: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.post.create({
        data: {
          title: input.title,
          contents: input.contents,
          postType: "Discussion",
        },
      });
    }),
  updatePostByID: protectedProcedure
    .input(
      z.object({
        id: z.number().nonnegative(),
        title: z.string().optional(),
        contents: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.post.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          contents: input.contents,
        },
      });
    }),
  deletePostByID: protectedProcedure
    .input(z.object({ id: z.number().nonnegative() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.post.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
