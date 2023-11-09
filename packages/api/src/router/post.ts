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
  db: PrismaClient,
  input: z.infer<typeof createPostInput>,
  postType: "Announcement" | "Discussion",
) => {
  await db.post.create({
    data: {
      ...input,
      postType,
    },
  });
};

const updatePost = async (
  db: PrismaClient,
  input: z.infer<typeof updatePostInput>,
  postType: "Announcement" | "Discussion",
) => {
  await db.post.update({
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
  db: PrismaClient,
  input: z.infer<typeof updatePostInput>,
  postType: "Announcement" | "Discussion",
) => {
  await db.post.delete({
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
      await createPost(ctx.db, input, "Discussion");
    }),
  createAnnouncement: adminProcedure
    .input(createPostInput)
    .mutation(async ({ ctx, input }) => {
      await createPost(ctx.db, input, "Announcement");
    }),
  updatePostByID: protectedProcedure
    .input(updatePostInput)
    .mutation(async ({ ctx, input }) => {
      await updatePost(ctx.db, input, "Discussion");
    }),
  updateAnnouncementByID: adminProcedure
    .input(updatePostInput)
    .mutation(async ({ ctx, input }) => {
      await updatePost(ctx.db, input, "Announcement");
    }),
  deletePostByID: protectedProcedure
    .input(deletePostInput)
    .mutation(async ({ ctx, input }) => {
      await deletePost(ctx.db, input, "Discussion");
    }),
  deleteAnnouncementByID: adminProcedure
    .input(deletePostInput)
    .mutation(async ({ ctx, input }) => {
      await deletePost(ctx.db, input, "Announcement");
    }),
});
