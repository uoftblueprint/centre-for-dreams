import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  createIfNotExists: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      await ctx.db.user.upsert({
        where: {
          clerkId: input,
        },
        update: {},
        create: {
          clerkId: input,
        },
      });
    }),
});
