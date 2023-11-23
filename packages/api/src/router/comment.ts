import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  list: protectedProcedure
    .input(
      z.object({
        postId: z.number().nonnegative(),
      }),
    )
    .query(async ({ input, ctx }) => {
      try {
        return await ctx.db.comment.findMany({
          where: { postId: input.postId },
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            text: true,
            createdAt: true,
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2025") {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Post not found",
            });
          }
        }
        throw e;
      }
    }),
  create: protectedProcedure
    .input(
      z.object({
        postId: z.number().nonnegative(),
        text: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const userId = ctx.userId;
        return await ctx.db.comment.create({
          data: {
            text: input.text,
            post: { connect: { id: input.postId } },
            user: { connect: { id: userId } },
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2025") {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Post not found",
            });
          }
        }
        throw e;
      }
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number().nonnegative(),
        text: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.userId;
      const comment = await ctx.db.comment.findUnique({
        where: { id: input.id },
        select: { id: true, userId: true },
      });
      if (!comment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found",
        });
      }
      if (comment.userId !== userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to edit this comment",
        });
      }
      return await ctx.db.comment.update({
        where: { id: input.id },
        data: { text: input.text },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.number().nonnegative(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.userId;
      const comment = await ctx.db.comment.findUnique({
        where: { id: input.id },
        select: { id: true, userId: true },
      });
      if (!comment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found",
        });
      }
      if (comment.userId !== userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to delete this comment",
        });
      }
      await ctx.db.comment.delete({ where: { id: input.id } });
      return comment;
    }),
});
