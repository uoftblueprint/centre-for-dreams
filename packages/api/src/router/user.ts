import { Clerk } from "@clerk/backend";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const clerk = Clerk({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export const userRouter = createTRPCRouter({
  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany();
  }),

  // Fetches the clerk data of every user that has signed up and returns a mapping of the form:
  // <clerkId, userData>
  getAllClerkUsers: protectedProcedure.query(async () => {
    const users = await clerk.users.getUserList();
    return new Map(users.map((user) => [user.id, user]));
  }),

  // This will change the approval status of the user with the given id in our database
  // If the user does not exist, they will NOT be created and an error will be thrown
  //
  // Although we can use the clerkId, we enforce fetching user the id in our database
  // since the approval attribute is a concept associated with our user model rather than clerk
  changeApprovalStatus: protectedProcedure
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
