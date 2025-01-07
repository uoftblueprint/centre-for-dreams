import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

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
    // Note that when creating a postMessage, image is uploaded and then transferred here to tRPC Router as a base64 String. It's converted to binaryBuffer HERE.
    .input(
      z.object({
        title: z.string().min(1),
        contents: z.string().min(0),
        images: z.string().array().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      let imageBuffers: Buffer[] = [];
      if (input.images) {
        imageBuffers = input.images.map((base64String) => {
          const binaryToBytes = (binary: string) => {
            const uint8Array = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
              uint8Array[i] = binary.charCodeAt(i);
            }
            return uint8Array;
          };

          const binary = atob(base64String);
          const uint8array = binaryToBytes(binary);
          const buffer = Buffer.from(uint8array);
          console.log(buffer);
          return buffer;
        });
      }
      console.log(imageBuffers);
      await ctx.db.post.create({
        data: {
          title: input.title,
          contents: input.contents,
          images: imageBuffers,
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
