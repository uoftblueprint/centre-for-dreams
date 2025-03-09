import { NextResponse } from "next/server";
import { authMiddleware, clerkClient, redirectToSignIn } from "@clerk/nextjs";

// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  // "/" is not protected since that's where we land
  // api routes are not protected since authentication is done via protected routes in trpc.ts
  publicRoutes: ["/", "/(api|trpc)(.*)"],
  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      return;
    }

    // user not logged in
    if (!auth.userId) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // we have to fetch using clerkClient since auth.user is undefined for some reason
    const user = await clerkClient.users.getUser(auth.userId);

    // protect every route
    if (user.publicMetadata.isAdmin !== true) {
      // we should probably let user know they're not authorized
      return NextResponse.redirect(new URL("/posts", req.url));
    }
  },
});

// See https://nextjs.org/docs/pages/building-your-application/routing/middleware#matcher for what config does
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
