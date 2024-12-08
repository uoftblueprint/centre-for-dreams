import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const likeRouter = createTRPCRouter({
  getLikesForDiscussion: protectedProcedure
    .input(
      z.object({
        postId: z.number().nonnegative(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const likes = await ctx.db.likes.findMany({
        where: { postId: input.postId },
      });

      const isLikedByUser = likes.some((like) => like.userId === ctx.userId);
      const likesCount = likes.length;

      return { isLikedByUser, likesCount };
    }),
  likePost: protectedProcedure
    .input(
      z.object({
        postId: z.number().nonnegative(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const existingLike = await ctx.db.likes.findFirst({
        where: {
          postId: input.postId,
          userId: ctx.userId,
        },
      });
      if (existingLike) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Post has already been liked by the user",
        });
      }
      try {
        await ctx.db.likes.create({
          data: {
            postId: input.postId,
            userId: ctx.userId,
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
