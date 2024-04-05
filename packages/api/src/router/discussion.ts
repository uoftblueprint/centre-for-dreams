import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Base64 } from "js-base64";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { uploadImage } from "./utils/supabaseUtils";

export const discussionRouter = createTRPCRouter({
  getDiscussions: protectedProcedure.query(async ({ ctx }) => {
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
        images: z.array(
          z.object({
            fileContents: z.string().refine(Base64.isValid).optional(),
            filePath: z.string().optional(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      const post = await ctx.db.post.create({
        data: {
          contents: input.contents,
          postType: "Discussion",
          user: { connect: { id: userId } },
        },
      });

      const imagePaths = await uploadImage(
        ctx.auth,
        "discussions",
        input.images.map((image) => {
          return {
            ...image,
            filePath: `${post.id}/${image.filePath}`,
          };
        }),
      );
      await ctx.db.post.update({
        where: {
          id: post.id,
        },
        data: { images: imagePaths },
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
