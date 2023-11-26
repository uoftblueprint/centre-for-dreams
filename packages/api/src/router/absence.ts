import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const absenceRouter = createTRPCRouter({
  createAbsence: protectedProcedure
    .input(
      z.object({
        absenceDate: z.date(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db.user.findUnique({ where: { id: ctx.userId } });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      await ctx.db.absence.upsert({
        create: {
          absenceDate: input.absenceDate,
          participantId: user.participantId,
        },
        update: {},
        where: {
          absenceDate_participantId: {
            absenceDate: input.absenceDate,
            participantId: user.participantId,
          },
        },
      });
    }),

  getAllAbsences: adminProcedure.query(async ({ ctx }) => {
    return await ctx.db.absence.findMany();
  }),

  getAbsences: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({ where: { id: ctx.userId } });
    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    return await ctx.db.absence.findMany({
      where: {
        participantId: user.participantId,
      },
    });
  }),

  deleteAbsence: protectedProcedure
    .input(
      z.object({
        absenceDate: z.date(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db.user.findUnique({ where: { id: ctx.userId } });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      await ctx.db.absence.delete({
        where: {
          absenceDate_participantId: {
            absenceDate: input.absenceDate,
            participantId: user.participantId,
          },
        },
      });
    }),
});
