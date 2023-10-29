import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const activityRouter = createTRPCRouter({
  getSchedule: protectedProcedure
    .input(z.object({ day: z.date() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.activity.findMany({
        where: {
          day: {
            gte: new Date(input.day),
            lte: new Date(input.day.setDate(input.day.getDate() + 7)),
          },
        },
        orderBy: { day: "desc" },
      });
    }),
  createActivity: adminProcedure
    .input(
      z.object({
        name: z.string(),
        day: z.date(),
        startTime: z.date(),
        duration: z.number().nonnegative(),
        leader: z.string(),
        location: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.activity.create({
        data: {
          name: input.name,
          day: input.day,
          startTime: input.startTime,
          duration: input.duration, 
          leader: input.leader,
          location: input.location,
        },
      });
    }),
  updateActivity: adminProcedure
    .input(
      z.object({
        id: z.number().nonnegative(),
        name: z.string().optional(),
        day: z.date().optional(),
        startTime: z.date().optional(),
        duration: z.number().nonnegative().optional(),
        leader: z.string().optional(),
        location: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.activity.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          day: input.day,
          startTime: input.startTime,
          duration: input.duration,
          leader: input.leader,
          location: input.location,
        },
      });
    }),
  deleteActivity: adminProcedure
    .input(z.object({ id: z.number().nonnegative() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.activity.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
