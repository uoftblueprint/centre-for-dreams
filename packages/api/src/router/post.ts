import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  getPosts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
  createPost: protectedProcedure.input(z.object({ title: z.string(), contents: z.string()})).mutation(async({ctx, input}) => {
    await ctx.db.post.create({
      data: {
        title: input.title,
        contents: input.contents,
      }
    })
  }),
  
});
