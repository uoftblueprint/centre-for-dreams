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
  // updatePostByID: protectedProcedure.input(z.object({ id: z.number(), title: z.string().optional(), contents: z.string().optional()})).mutation(async({ctx, input}) => {
  //   await ctx.db.post.upsert({
  //     where: {
  //       id: input.id
  //     }, 
  //     data: {
  //       title: input.title,
  //       content: input.contents
  //     }
  //   })
  // }),
  deletePostByID: protectedProcedure.input(z.object({ id: z.number()})).mutation(async({ctx, input}) => {
    await ctx.db.post.delete({
      where: {
        id: input.id
      }
    })
  }),
  
});
