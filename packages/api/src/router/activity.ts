import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "../trpc";

export const activityRouter = createTRPCRouter({
  getActivity: adminProcedure.query(async ({ ctx }) => {
    return await ctx.db.activity.findMany({
      orderBy: { day: "desc" },
    });
  }),
  getSchedule: adminProcedure
    .input(z.object({ day: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.activity.findMany({
        where: {
          day: {
            gte: new Date(input.day),
            lte: new Date(
              new Date(input.day).getTime() + 7 * 24 * 60 * 60 * 1000,
            ),
          },
        },
        orderBy: { day: "desc" },
      });
    }),
  createActivity: adminProcedure
    .input(
      z.object({
        name: z.string(),
        day: z.string(), // format YYYY-MM-DD
        startTime: z.string(), // format HH:MM
        endTime: z.string(), // format HH:MM
        leader: z.string(),
        location: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.activity.create({
        data: {
          name: input.name,
          day: new Date(input.day),
          startTime: new Date("1970/01/01 " + input.startTime + "Z"),
          endTime: new Date("1970/01/01 " + input.endTime + "Z"),
          leader: input.leader,
          location: input.location,
        },
      });
    }),
  updateAcitivty: adminProcedure
    .input(
      z.object({
        id: z.number().nonnegative(),
        name: z.string().optional(),
        day: z.string().optional(), // format YYYY-MM-DD
        startTime: z.string().optional(), // format HH:MM
        endTime: z.string().optional(), // format HH:MM
        leader: z.string().optional(),
        location: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.activity.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          day: input.day ? new Date(input.day) : input.day,
          startTime: input.startTime
            ? new Date("1970/01/01 " + input.startTime + "Z")
            : input.startTime,
          endTime: input.endTime
            ? new Date("1970/01/01 " + input.endTime + "Z")
            : input.endTime,
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
