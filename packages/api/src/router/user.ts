import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  findUserWithClerkId: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      return await ctx.db.user.findUniqueOrThrow({
        where: {
          clerkId: input,
        },
      });
    }),

  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany();
  }),

  // Fetches the clerk data of every user that has signed up and returns a mapping of the form:
  // <clerkId, userData>
  getAllClerkUsers: protectedProcedure.query(async () => {
    const users = await clerkClient.users.getUserList();
    return new Map(users.map((user) => [user.id, user]));
  }),

  // This will change the approval status of the user with the given id in our database
  // If the user does not exist, they will NOT be created and an error will be thrown
  //
  // Although we can use the clerkId, we enforce fetching user the id in our database
  // since the approval attribute is a concept associated with our user model rather than clerk
  changeApprovalStatus: adminProcedure
    .input(
      z.object({
        id: z.number(),
        isApproved: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          isApproved: input.isApproved,
        },
      });
    }),
});
