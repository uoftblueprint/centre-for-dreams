import { absenceRouter } from "./router/absence";
import { activityRouter } from "./router/activity";
import { announcementRouter } from "./router/announcement";
import { developerRouter } from "./router/developer";
import { notificationRouter } from "./router/notification";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  developer: developerRouter,
  post: postRouter,
  announcement: announcementRouter,
  activity: activityRouter,
  absence: absenceRouter,
  notification: notificationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
