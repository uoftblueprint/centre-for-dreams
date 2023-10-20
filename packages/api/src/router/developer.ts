import { createTRPCRouter, publicProcedure } from "../trpc";

export const developerRouter = createTRPCRouter({
  count: publicProcedure
    .meta({ description: "Returns number of developers in developers table" })
    .query(async ({ ctx }) => {
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

  sarinali_info: publicProcedure.query(async ({ ctx }) => {
    let upvotes = 0;
    // check if exist in table
    const sarinaExists = await ctx.db.developers.findFirst({
      where: {
        name: "Sarina Li",
      },
    });

    // does not exist, add to table
    if (!sarinaExists) {
      await ctx.db.developers.create({
        data: {
          name: "Sarina Li",
          upvotes: 0,
        },
      });
    } else {
      upvotes = sarinaExists.upvotes;
    }

    return {
      name: "Sarina Li",
      year: 2,
      introduction:
        "I am a developer for CFD, I like to weightlift in my free time",
      fav_food: "hot pot",
      fav_song: "New Person, Same Old Mistakes by Tame Impala",
      upvotes: upvotes,
    };
  }),

  sarinali_upvote: publicProcedure.mutation(async ({ ctx }) => {
    // insert if not in table
    await ctx.db.developers.update({
      where: {
        name: "Sarina Li",
      },
      data: {
        upvotes: { increment: 1 },
      },
    });
  }),
  jasonwang_info: publicProcedure.query(async ({ ctx }) => {
    let user = await ctx.db.developers.findUnique({
      where: { name: "Jason Wang" },
    });
    if (!user) {
      user = await ctx.db.developers.create({
        data: {
          name: "Jason Wang",
          upvotes: 0,
        },
      });
    }
    return {
      name: "Jason Wang",
      year: 3,
      introduction:
        "Hi! I'm a third year CS and CogSci student at UofT and I'm a developer for the CFD Blueprint team.",
      fav_food: "Sushi",
      fav_song: "Helium - Glass Animals",
      upvotes: user.upvotes,
    };
  }),
  jasonwang_upvote: publicProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.db.developers.update({
      where: { name: "Jason Wang" },
      data: { upvotes: { increment: 1 } },
    });
    return user;
  }),
});
