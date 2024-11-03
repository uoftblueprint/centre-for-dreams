import { createTRPCRouter, publicProcedure } from "../trpc";

export const developerRouter = createTRPCRouter({
  count: publicProcedure
    .meta({ description: "Returns number of developers in developers table" })
    .query(async ({ ctx }) => {
      return await ctx.db.developers.count();
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
      year: 3,
      introduction: "I am the PL for CFD this year, I like Pokemon Go.",
      fav_food: "hot pot",
      fav_song: "Who Hurt You? - Daniel Caesar",
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

  emilyzhou_info: publicProcedure.query(async ({ ctx }) => {
    let developer = await ctx.db.developers.findFirst({
      where: { name: "Emily Zhou" },
    });

    // Create developer if doesn't exist
    if (developer === null) {
      developer = await ctx.db.developers.create({
        data: {
          name: "Emily Zhou",
          upvotes: 0,
        },
      });
    }

    return {
      name: "Emily Zhou",
      year: 3,
      introduction:
        "Hello! I am the PM for CFD this year, I also like Pokemon Go.",
      fav_food: "Cheese",
      fav_song: "Juno by Sabrina Carpenter",
      upvotes: developer.upvotes,
    };
  }),
  emilyzhou_update: publicProcedure.mutation(async ({ ctx }) => {
    // Update!
    return await ctx.db.developers.update({
      where: { name: "Emily Zhou" },
      data: { upvotes: { increment: 1 } },
    });
  }),
  jeff_info: publicProcedure.query(async ({ ctx }) => {
    let developer = await ctx.db.developers.findFirst({
      where: { name: "Jeff Huang" },
    });

    // Create developer if doesn't exist
    if (developer === null) {
      developer = await ctx.db.developers.create({
        data: {
          name: "Jeff Huang",
          upvotes: 0,
        },
      });
    }

    return {
      name: "Jeff Huang",
      year: 4,
      introduction:
        "free is the puppet that loves their strings",
      fav_food: "gin",
      fav_song: "ed sheeran - bad habits",
      upvotes: developer.upvotes,
    };
  }),
  jeff_upvote: publicProcedure.mutation(async ({ ctx }) => {
    // Update!
    return await ctx.db.developers.update({
      where: { name: "Jeff Huang" },
      data: { upvotes: { increment: 1 } },
    });
  }),
  danielxu_info: publicProcedure.query(async ({ ctx }) => {
    let developer = await ctx.db.developers.findFirst({
      where: { name: "Daniel Xu" },
    });

    // Create developer if doesn't exist
    if (developer === null) {
      developer = await ctx.db.developers.create({
        data: {
          name: "Daniel Xu",
          upvotes: 0,
        },
      });
    }

    return {
      name: "Daniel Xu",
      year: 4,
      introduction:
        "I'm a senior developer on the team, and I playn't Pokemon Go.",
      fav_food: "Sushi",
      fav_song: "Cherry Wine by Grentperez",
      upvotes: developer.upvotes,
    };
  }),

  danielxu_update: publicProcedure.mutation(async ({ ctx }) => {
    return await ctx.db.developers.update({
      where: { name: "Daniel Xu" },
      data: { upvotes: { increment: 1 } },
    });
  }),

  elsiezhu_info: publicProcedure.query(async ({ ctx }) => {
    let upvotes = 0;
    // check if developer exists in table
    const elsieExists = await ctx.db.developers.findFirst({
      where: {
        name: "Elsie Zhu",
      },
    });

    // create developer if doesn't exist
    if (!elsieExists) {
      await ctx.db.developers.create({
        data: {
          name: "Elsie Zhu",
        },
      });
    } else {
      upvotes = elsieExists.upvotes;
    }

    return {
      name: "Elsie Zhu",
      year: 4,
      introduction: "Hey! I am a Senior Dev on CFD this year",
      fav_food: "lobster",
      fav_song: "Casual by Chappell Roan",
      upvotes: upvotes,
    };
  }),

  elsiezhu_upvote: publicProcedure.mutation(async ({ ctx }) => {
    // insert if not in table
    await ctx.db.developers.update({
      where: {
        name: "Elsie Zhu",
      },
      data: {
        upvotes: { increment: 1 },
      },
    });
  }),

  carlossolares_info: publicProcedure.query(async ({ ctx }) => {
    let upvotes = 0;

    // check if exist in table
    const carlosExists = await ctx.db.developers.findFirst({
      where: {
        name: "Carlos Solares",
      },
    });

    if (!carlosExists) {
      await ctx.db.developers.create({
        data: {
          name: "Carlos Solares",
          upvotes: 0,
        },
      });
    } else {

      upvotes = carlosExists.upvotes;
    }

    return {
      name: "Carlos Solares",
      year: 2,
      introduction:
        "I'm a developer for CFD this year! Fun fact: I love scuba diving.",
      fav_food: "Pasta Carbonara",
      fav_song: "Quiereme - Mickey Taveras",
      upvotes: upvotes,
    };
  }),



  carlossolares_upvote: publicProcedure.mutation(async ({ ctx }) => {
    await ctx.db.developers.update({
      where: {
        name: "Carlos Solares",
      },
      data: {
        upvotes: { increment: 1 },
      },
    });
  }),
});
