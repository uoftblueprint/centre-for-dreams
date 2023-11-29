import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany();
  }),

  // Fetches the clerk data of every user that has signed up and returns a mapping of the form:
  // <clerkId, userData>
  getAllClerkUsers: protectedProcedure.query(async () => {
    const users = await clerkClient.users.getUserList();
    return new Map(users.map((user) => [user.id, user]));
  }),

  // This will change the approval status of the user with the given id in our database,
  // and on clerk. When we retrieve this data we'll retrieve it from clerk, but we want
  // to keep these two fields consistent in case we want to migrate off of clerk some day
  changeApprovalStatus: adminProcedure
    .input(
      z.object({
        id: z.number(),
        isApproved: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          isApproved: input.isApproved,
        },
      });
      await clerkClient.users.updateUserMetadata(user.clerkId, {
        publicMetadata: {
          isApproved: input.isApproved,
        },
      });
    }),
});
