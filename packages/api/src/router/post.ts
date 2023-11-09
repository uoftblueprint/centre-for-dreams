import type { SignedInAuthObject } from "@clerk/clerk-sdk-node";
import type { PrismaClient } from "@prisma/client";
import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

const basePostInput = {
  title: z.string().trim().min(1).max(300),
  contents: z.string().min(1),
};

const createPostInput = z.object({
  ...basePostInput,
});

const updatePostInput = z
  .object({
    id: z.number().nonnegative(),
    ...basePostInput,
  })
  .partial();

const deletePostInput = z.object({
  id: z.number().nonnegative(),
});

const createPost = async (
  ctx: { db: PrismaClient; auth: SignedInAuthObject },
  input: z.infer<typeof createPostInput>,
  postType: "Announcement" | "Discussion",
) => {
  await ctx.db.post.create({
    data: {
      ...input,
      postType,
    },
  });
};

const updatePost = async (
  ctx: { db: PrismaClient; auth: SignedInAuthObject },
  input: z.infer<typeof updatePostInput>,
  postType: "Announcement" | "Discussion",
) => {
  await ctx.db.post.update({
    where: {
      id: input.id,
      postType,
    },
    data: {
      ...input,
    },
  });
};

const deletePost = async (
  ctx: { db: PrismaClient; auth: SignedInAuthObject },
  input: z.infer<typeof updatePostInput>,
  postType: "Announcement" | "Discussion",
) => {
  await ctx.db.post.delete({
    where: {
      id: input.id,
      postType,
    },
  });
};

export const postRouter = createTRPCRouter({
  getPosts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
  createPost: protectedProcedure
    .input(createPostInput)
    .mutation(async ({ ctx, input }) => {
      await createPost(ctx, input, "Discussion");
    }),
  createAnnouncement: adminProcedure
    .input(createPostInput)
    .mutation(async ({ ctx, input }) => {
      await createPost(ctx, input, "Announcement");
    }),
  updatePostByID: protectedProcedure
    .input(updatePostInput)
    .mutation(async ({ ctx, input }) => {
      await updatePost(ctx, input, "Discussion");
    }),
  updateAnnouncementByID: adminProcedure
    .input(updatePostInput)
    .mutation(async ({ ctx, input }) => {
      await updatePost(ctx, input, "Announcement");
    }),
  deletePostByID: protectedProcedure
    .input(deletePostInput)
    .mutation(async ({ ctx, input }) => {
      await deletePost(ctx, input, "Discussion");
    }),
  deleteAnnouncementByID: adminProcedure
    .input(deletePostInput)
    .mutation(async ({ ctx, input }) => {
      await deletePost(ctx, input, "Announcement");
    }),
});
