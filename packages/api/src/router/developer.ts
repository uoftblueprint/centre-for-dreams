import { createTRPCRouter, publicProcedure } from "../trpc";

export const developerRouter = createTRPCRouter({
  count: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.developers.count();
  }),
});

export const ryanLiRouter = createTRPCRouter({
  count: publicProcedure.query(async () => {
    return {
      name: "Ryan Li",
      year: 2,
      introduction: "I am a developer for the CFD team on UofT blueprint!",
      fav_food: "pasta",
      fav_song: "Piano Concerto No. 24 K491",
    };
  }),
});
