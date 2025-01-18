import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const discussionRouter = createTRPCRouter({
  getDiscussions: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      const skip = (input.page - 1) * input.limit;
      const where: Prisma.PostWhereInput = { postType: "Discussion" }; // Correct typing

      const [discussions, totalCount] = await Promise.all([
        ctx.db.post.findMany({
          skip,
          take: input.limit,
          orderBy: { createdAt: "desc" },
          where, // Use the correctly typed where clause
          include: { comments: { orderBy: { createdAt: "asc" } } },
        }),
        ctx.db.post.count({ where }),
      ]);

      return { discussions, totalCount };
    }),
  getDiscussionsByUser: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;
    return await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        postType: "Discussion",
        userId: userId,
      },
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
        contents: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      await ctx.db.post.create({
        data: {
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
  getReplies: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;
    const userPosts = await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        userId: userId,
      },
      select: {
        id: true,
      },
    });
    const userPostIds = userPosts.map((post) => post.id);
    return await ctx.db.comment.findMany({
      where: {
        postId: {
          in: userPostIds,
        },
        userId: {
          not: userId,
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }),
});
