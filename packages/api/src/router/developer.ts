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
  girik_info: publicProcedure.query(async ({ ctx }) => {
    let upvotes = 0;
    // check if exist in table
    const girikExists = await ctx.db.developers.findFirst({
      where: {
        name: "Girik Setya",
      },
    });

    // does not exist, add to table
    if (!girikExists) {
      await ctx.db.developers.create({
        data: {
          name: "Girik Setya",
          upvotes: 0,
        },
      });
    } else {
      upvotes = girikExists.upvotes;
    }

    return {
      name: "Girik Setya",
      year: 2,
      introduction:
        "I am Second Year CS Specialist joining as a Junior Developer",
      fav_food: "Pizza",
      fav_song: "Thick of It - KSI",
      upvotes: upvotes,
    };
  }),

  girik_upvote: publicProcedure.mutation(async ({ ctx }) => {
    // insert if not in table
    await ctx.db.developers.update({
      where: {
        name: "Girik Setya",
      },
      data: {
        upvotes: { increment: 1 },
      },
    });
  }),
});
