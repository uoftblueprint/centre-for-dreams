import { developerRouter } from "./router/developer";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  developer: developerRouter,
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
