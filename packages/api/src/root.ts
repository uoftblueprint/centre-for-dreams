import { absenceRouter } from "./router/absence";
import { activityRouter } from "./router/activity";
import { announcementRouter } from "./router/announcement";
import { developerRouter } from "./router/developer";
import { discussionRouter } from "./router/discussion";
import { notificationRouter } from "./router/notification";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  developer: developerRouter,
  discussion: discussionRouter,
  announcement: announcementRouter,
  activity: activityRouter,
  absence: absenceRouter,
  notification: notificationRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
