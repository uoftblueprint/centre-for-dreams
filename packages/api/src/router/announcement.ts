import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Base64 } from "js-base64";
import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { uploadImage } from "./utils/supabaseUtils";

export const announcementRouter = createTRPCRouter({
  getAnnouncementByID: protectedProcedure
    .input(z.number().nonnegative())
    .query(async ({ ctx, input }) => {
      return await ctx.db.post.findUnique({
        where: {
          id: input,
          postType: "Announcement",
        },
        include: {
          comments: {
            orderBy: { createdAt: "asc" },
          },
        },
      });
    }),
  getAnnouncements: protectedProcedure.query(async ({ ctx }) => {
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
        images: z.array(
          z.object({
            fileContents: z
              .string()
              .refine(Base64.isValid)
              .or(z.null())
              .or(z.undefined()),
            filePath: z.string().or(z.null()).or(z.undefined()),
            fileSize: z.number().or(z.null()).or(z.undefined()), // file size in bytes
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      await uploadImage(ctx.auth, "annoucements", input.images);

      await ctx.db.post.create({
        data: {
          title: input.title,
          contents: input.contents,
          postType: "Announcement",
          user: { connect: { id: userId } },
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
      try {
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
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2025") {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Announcement with the given ID not found",
            });
          }
        }
        throw e;
      }
    }),
  deleteAnnouncementByID: adminProcedure
    .input(z.object({ id: z.number().nonnegative() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.post.delete({
          where: {
            id: input.id,
            postType: "Announcement",
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2025") {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Announcement with the given ID not found",
            });
          }
          throw e;
        }
      }
    }),
});
