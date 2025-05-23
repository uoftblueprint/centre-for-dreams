import type { Activity } from "@prisma/client";
import { addDays, addWeeks } from "date-fns";
import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

const combineDateAndTime = (day: Date, time: Date): Date => {
  const fullDate = new Date(day);
  fullDate.setUTCHours(
    time.getUTCHours(),
    time.getUTCMinutes(),
    time.getUTCSeconds(),
    time.getUTCMilliseconds(),
  );
  return fullDate;
};

function isValidDate(dateString: string): boolean {
  const parsedDate = Date.parse(dateString);
  if (isNaN(parsedDate)) {
    return false;
  }

  const date = new Date(parsedDate);
  const formattedDate = date.toISOString().split("T")[0];

  return dateString === formattedDate;
}

export const activityRouter = createTRPCRouter({
  getSchedule: protectedProcedure
    .input(z.object({ day: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!isValidDate(input.day)) {
        throw new Error("Invalid date format. Expected YYYY-MM-DD");
      }
      const inputDay = new Date(input.day);
      return await ctx.db.activity.findMany({
        where: {
          day: {
            gte: inputDay.toISOString(),
            lte: addWeeks(inputDay, 1).toISOString(),
          },
        },
        orderBy: { day: "desc" },
      });
    }),
  getScheduleUTC: protectedProcedure
    .input(z.object({ day: z.date() }))
    .query(async ({ ctx, input }) => {
      const inputDay = input.day;
      const nextWeek = addWeeks(inputDay, 1);
      const activities: Activity[] = await ctx.db.activity.findMany({
        where: {
          day: {
            gte: inputDay,
            lt: nextWeek,
          },
        },
        orderBy: {
          day: "asc",
        },
      });
      const startRange = inputDay;
      const endRange = nextWeek;
      const filtered = activities.filter((activity) => {
        const activityDateTime = combineDateAndTime(
          activity.day,
          activity.startTime,
        );
        return activityDateTime >= startRange && activityDateTime < endRange;
      });
      return filtered;
    }),
  getDailySchedule: protectedProcedure
    .input(z.object({ day: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!isValidDate(input.day)) {
        throw new Error("Invalid date format. Expected YYYY-MM-DD");
      }
      const inputDay = new Date(input.day);
      return await ctx.db.activity.findMany({
        where: {
          day: inputDay.toISOString(),
        },
        orderBy: { day: "desc" },
      });
    }),
  getDailyScheduleUTC: protectedProcedure
    .input(z.object({ day: z.date() }))
    .query(async ({ ctx, input }) => {
      const inputDay = input.day;
      const nextDay = addDays(inputDay, 1);
      const activities: Activity[] = await ctx.db.activity.findMany({
        where: {
          day: {
            gte: inputDay,
            lt: nextDay,
          },
        },
        orderBy: {
          day: "asc",
        },
      });
      const startRange = inputDay;
      const endRange = nextDay;
      const filtered = activities.filter((activity) => {
        const activityDateTime = combineDateAndTime(
          activity.day,
          activity.startTime,
        );
        return activityDateTime >= startRange && activityDateTime < endRange;
      });
      return filtered;
    }),
  getActivity: adminProcedure
    .input(z.object({ id: z.number().nonnegative() }))
    .query(async ({ ctx, input }) => {
      const activity = await ctx.db.activity.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!activity) {
        throw new Error(`Activity with id ${input.id} not found`);
      }

      return activity;
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
  getSubactivities: protectedProcedure
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

      return result;
    }),
});
