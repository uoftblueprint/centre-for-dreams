import { developerRouter } from "./router/developer";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  developer: developerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
