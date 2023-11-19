import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const absenceRouter = createTRPCRouter({
  createAbsence: protectedProcedure
    .input(
      z.object({
        userId: z.number().nonnegative(),
        absenceDate: z.date(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.absence.create({
        data: {
          userId: input.userId,
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
        userId: z.number().nonnegative(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return await ctx.db.absence.findMany({
        where: {
          userId: input.userId,
        },
      });
    }),

  deleteAbsence: protectedProcedure
    .input(
      z.object({
        userId: z.number().nonnegative(),
        absenceDate: z.date(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.absence.deleteMany({
        where: {
          userId: input.userId,
          absenceDate: input.absenceDate,
        },
      });
    }),
});
