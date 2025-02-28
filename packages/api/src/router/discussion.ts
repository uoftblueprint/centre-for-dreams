import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const discussionRouter = createTRPCRouter({
  getDiscussions: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        pageSize: z.number().min(1).max(100).default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      const skip = (input.page - 1) * input.pageSize;

      const [posts, total] = await ctx.db.$transaction([
        ctx.db.post.findMany({
          skip,
          take: input.pageSize,
          orderBy: { createdAt: "desc" },
          where: { postType: "Discussion" },
          include: {
            comments: { orderBy: { createdAt: "asc" } },
            user: true,
            likes: true,
          },
        }),
        ctx.db.post.count({ where: { postType: "Discussion" } }),
      ]);

      return {
        posts,
        totalPages: Math.ceil(total / input.pageSize),
        currentPage: input.page,
      };
    }),

  getDiscussionsByUser: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        pageSize: z.number().min(1).max(100).default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const skip = (input.page - 1) * input.pageSize;

      const [posts, total] = await ctx.db.$transaction([
        ctx.db.post.findMany({
          skip,
          take: input.pageSize,
          orderBy: { createdAt: "desc" },
          where: {
            postType: "Discussion",
            userId,
          },
          include: {
            comments: { orderBy: { createdAt: "asc" } },
            user: true,
            likes: true,
          },
        }),
        ctx.db.post.count({
          where: {
            postType: "Discussion",
            userId,
          },
        }),
      ]);

      return {
        posts,
        totalPages: Math.ceil(total / input.pageSize),
        currentPage: input.page,
      };
    }),
  createDiscussion: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        contents: z.string().min(0).optional(),
        images: z.string().array().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      await ctx.db.post.create({
        data: {
          title: input.title,
          contents: input.contents,
          images: input.images,
          postType: "Discussion",
          user: { connect: { id: userId } },
        },
      });
    }),
  updateDiscussionByID: protectedProcedure
    .input(
      z.object({
        id: z.number().nonnegative(),
        title: z.string().min(1).optional(),
        contents: z.string().min(0).optional(),
        images: z.string().array().optional(),
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
            images: input.images,
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
