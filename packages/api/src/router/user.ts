import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";

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

  /**
   * Checks if the user with the given email is approved in clerk.
   * Since we want this to be callable when the user is not authenticated, it must
   * remain public. Thus, we should not return sensitive data and only include the
   * bare minimum in the return value.
   * @returns an object of the form {userExists: bool, isApproved: bool}
   */
  isEmailApproved: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const users = await clerkClient.users.getUserList({
        emailAddress: [input],
      });
      if (users.length == 0) {
        return { userExists: false, isApproved: false };
      }
      return {
        userExists: true,
        isApproved:
          users.filter((user) => user.publicMetadata.isApproved).length >= 1,
      };
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
