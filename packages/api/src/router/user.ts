import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getAllUsers: adminProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany();
  }),

  // Fetches the clerk data of every user that has signed up and returns a mapping of the form:
  // <clerkId, userData>
  getAllClerkUsers: adminProcedure.query(async () => {
    const users = await clerkClient.users.getUserList();
    return new Map(users.map((user) => [user.id, user]));
  }),

  changeApprovalStatus: adminProcedure
    .input(
      z.object({
        clerkId: z.string(),
        isApproved: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      await clerkClient.users.updateUserMetadata(input.clerkId, {
        publicMetadata: {
          isApproved: input.isApproved,
        },
      });
    }),

  // This is strictly used for internal testing and should be removed in the future
  changeCurrentUserAdminStatus: protectedProcedure
    .input(
      z.object({
        isAdmin: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await clerkClient.users.updateUserMetadata(ctx.auth.userId, {
        publicMetadata: {
          isAdmin: input.isAdmin,
        },
      });
    }),
});
