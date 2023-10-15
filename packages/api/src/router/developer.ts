import { createTRPCRouter, publicProcedure } from "../trpc";

export const developerRouter = createTRPCRouter({
  count: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.developers.count();
  }),
  ryanli_info: publicProcedure.query(async ({ ctx }) => {
    await ctx.db.developers.upsert({
      where: {
        name: "Ryan Li",
      },
      update: {},
      create: {
        name: "Ryan Li",
        upvotes: 0,
      },
    });
    const upvotes = await ctx.db.developers
      .findUnique({
        where: {
          name: "Ryan Li",
        },
      })
      .then((dev) => dev?.upvotes);
    return {
      name: "Ryan Li",
      year: 3,
      introduction: "I am a developer for the CFD team on UofT blueprint!",
      fav_food: "pasta",
      fav_song: "Piano Concerto No. 24 K491",
      upvotes: upvotes,
    };
  }),
  ryanli_upvote: publicProcedure.mutation(async ({ ctx }) => {
    return await ctx.db.developers.update({
      where: { name: "Ryan Li" },
      data: { upvotes: { increment: 1 } },
    });
  }),
});
