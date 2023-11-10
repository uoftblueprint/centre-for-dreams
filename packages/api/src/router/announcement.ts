import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "../trpc";

export const announcementRouter = createTRPCRouter({
  getAnnouncements: adminProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      where: { postType: "Announcement" },
    });
  }),
  createAnnouncement: adminProcedure
    .input(
      z.object({
        title: z.string().trim().min(1).max(300),
        contents: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.post.create({
        data: {
          title: input.title,
          contents: input.contents,
          postType: "Announcement",
        },
      });
    }),
  updateAnnouncementByID: adminProcedure
    .input(
      z.object({
        id: z.number().nonnegative(),
        title: z.string().optional(),
        contents: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.findFirst({
        where: {
          id: input.id,
          postType: "Announcement",
        },
      });

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Announcement with the given ID not found",
        });
      }

      await ctx.db.post.update({
        where: {
          id: input.id,
          postType: "Announcement",
        },
        data: {
          title: input.title,
          contents: input.contents,
        },
      });
    }),
  deleteAnnouncementByID: adminProcedure
    .input(z.object({ id: z.number().nonnegative() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.findFirst({
        where: {
          id: input.id,
          postType: "Announcement",
        },
      });

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Announcement with the given ID not found",
        });
      }

      await ctx.db.post.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
