import { developerRouter, ryanLiRouter } from "./router/developer";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  developer: developerRouter,
  ryanli: ryanLiRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
