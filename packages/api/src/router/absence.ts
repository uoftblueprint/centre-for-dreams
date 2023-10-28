import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

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

  getAllAbsences: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.absence.findMany();
  }),

  updateAbsence: protectedProcedure
    .input(
      z.object({
        id: z.number().nonnegative(),
        userId: z.number().nonnegative().optional(),
        absenceDate: z.date().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.absence.update({
        where: {
          id: input.id,
        },
        data: {
          userId: input.userId,
          absenceDate: input.absenceDate,
        },
      });
    }),

  deleteAbsence: protectedProcedure
    .input(
      z.object({
        id: z.number().nonnegative(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.absence.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
