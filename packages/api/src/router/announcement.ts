import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createCaller } from "../../index";
import type { innerTRPCContext } from "../trpc";
import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

const sendNotification = async (
  pushTokens: string[],
  ctx: innerTRPCContext,
  title?: string,
  body?: string,
  subtitle?: string,
) => {
  const caller = createCaller(ctx);
  await caller.notification.push({
    pushTokens,
    title,
    body,
    subtitle,
  });
};

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
        sendNotification: z.boolean().optional().default(true),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const res = await ctx.db.post.create({
        data: {
          title: input.title,
          contents: input.contents,
          postType: "Announcement",
          user: { connect: { id: userId } },
        },
      });
      if (res.id && input.sendNotification) {
        const pushTokens = await ctx.db.pushToken.findMany({
          where: { userId: { not: userId } },
        });
        await sendNotification(
          pushTokens.map((pt) => pt.token),
          ctx,
          input.title,
          input.contents,
        );
      }
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
