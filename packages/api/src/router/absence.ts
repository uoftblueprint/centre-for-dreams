import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const absenceRouter = createTRPCRouter({
  createAbsence: protectedProcedure
    .input(
      z.object({
        participantId: z.number().nonnegative(),
        absenceDate: z.date(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.absence.create({
        data: {
          participantId: input.participantId,
          absenceDate: input.absenceDate,
        },
      });
    }),

  getAllAbsences: adminProcedure.query(async ({ ctx }) => {
    return await ctx.db.absence.findMany();
  }),

  getAbsences: protectedProcedure
    .input(
      z.object({
        participantId: z.number().nonnegative(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return await ctx.db.absence.findMany({
        where: {
          participantId: input.participantId,
        },
      });
    }),

  deleteAbsence: protectedProcedure
    .input(
      z.object({
        participantId: z.number().nonnegative(),
        absenceDate: z.date(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.absence.deleteMany({
        where: {
          participantId: input.participantId,
          absenceDate: input.absenceDate,
        },
      });
    }),
});
