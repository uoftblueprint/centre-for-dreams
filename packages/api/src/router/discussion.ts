import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const discussionRouter = createTRPCRouter({
  getDiscussions: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      where: { postType: "Discussion" },
      include: {
        comments: {
          orderBy: { createdAt: "asc" },
        },
      },
    });
  }),
  createDiscussion: protectedProcedure
    .input(
      z.object({
        title: z.string().trim().min(1).max(300),
        contents: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      await ctx.db.post.create({
        data: {
          title: input.title,
          contents: input.contents,
          postType: "Discussion",
          user: { connect: { id: userId } },
        },
      });
    }),
  updateDiscussionByID: protectedProcedure
    .input(
      z.object({
        id: z.number().nonnegative(),
        title: z.string().optional(),
        contents: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.post.update({
          where: {
            id: input.id,
            postType: "Discussion",
          },
          data: {
            title: input.title,
            contents: input.contents,
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2025") {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Discussion with the given ID not found",
            });
          }
        }
        throw e;
      }
    }),
  deleteDiscussionByID: protectedProcedure
    .input(z.object({ id: z.number().nonnegative() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.post.delete({
          where: {
            id: input.id,
            postType: "Discussion",
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2025") {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Discussion with the given ID not found",
            });
          }
        }
        throw e;
      }
    }),
});
