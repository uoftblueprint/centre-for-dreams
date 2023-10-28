import { absenceRouter } from "./router/absence";
import { developerRouter } from "./router/developer";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  developer: developerRouter,
  post: postRouter,
  absence: absenceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
