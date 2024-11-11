import { addWeeks } from "date-fns";
import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";

export const activityRouter = createTRPCRouter({
  getSchedule: protectedProcedure
    .input(z.object({ day: z.date() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.activity.findMany({
        where: {
          day: {
            gte: input.day,
            lte: addWeeks(input.day, 1),
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
        durationMinutes: z.number().min(15),
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
          durationMinutes: input.durationMinutes,
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
        durationMinutes: z.number().min(15).optional(),
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
          durationMinutes: input.durationMinutes,
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
  getSubactivities: publicProcedure
    .input(z.object({ id: z.number() })) // I assumed "event" and "activity" are used interchangeably in the ticket
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.activity.findUnique({
        where: {
          id: input.id,
        },
        select: {
          subactivities: true,
        },
      });

      console.log("Query result:", result);

      return result;
    }),
});
