/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1)
 * 2. You want to create a new middleware or type of procedure (see Part 3)
 *
 * tl;dr - this is where all the tRPC server stuff is created and plugged in.
 * The pieces you will need to use are documented accordingly near the end
 */
import { clerkClient } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import type { PrismaClient } from "@prisma/client";
import { initTRPC, TRPCError } from "@trpc/server";
import type * as trpcNext from "@trpc/server/adapters/next";
import superjson from "superjson";
import type { TRPCPanelMeta } from "trpc-panel";
import { ZodError } from "zod";

import { db } from "@cfd/db";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API
 *
 * These allow you to access things like the database, the session, etc, when
 * processing a request
 *
 */

/**
 * This helper generates the "internals" for a tRPC context. If you need to use
 * it, you can export it from here
 *
 * Examples of things you may need it for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
interface innerTRPCContext {
  db: PrismaClient;
  auth: ReturnType<typeof getAuth>;
  userId: number | null; // the user id within OUR database, a monotonically increasing integer
}

const createInnerTRPCContext = ({
  auth,
}: {
  auth: ReturnType<typeof getAuth>;
}): innerTRPCContext => {
  return {
    db,
    auth,
    userId: null,
  };
};

/**
 * This is the actual context you'll use in your router. It will be used to
 * process every request that goes through your tRPC endpoint
 * @link https://trpc.io/docs/context
 */
export const createTRPCContext = (opts: trpcNext.CreateNextContextOptions) => {
  return createInnerTRPCContext({ auth: getAuth(opts.req) });
};

/**
 * 2. INITIALIZATION
 *
 * This is where the trpc api is initialized, connecting the context and
 * transformer
 */
const t = initTRPC
  .meta<TRPCPanelMeta>()
  .context<typeof createTRPCContext>()
  .create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.cause instanceof ZodError ? error.cause.flatten() : null,
        },
      };
    },
  });

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these
 * a lot in the /src/server/api/routers folder
 */

/**
 * This is how you create new routers and subrouters in your tRPC API
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export const publicProcedure = t.procedure;

/**
 * Protected (authenticated) procedure
 *
 * Theses procedures are available to all users who are logged in.
 * Should be used for any user-facing endpoints.
 *
 */

const isAuthed = t.middleware(async ({ next, ctx }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  await ctx.db.participant.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      name: "Test",
    },
  });

  // If the user isn't in our database yet, insert them
  const userId = ctx.auth.userId;
  const user = await ctx.db.user.upsert({
    where: {
      clerkId: userId,
    },
    update: {},
    create: {
      clerkId: userId,
      participantId: 1,
    },
  });

  return next({
    ctx: {
      auth: ctx.auth,
      userId: user.id, // the user id within OUR database, a monotonically increasing integer
    },
  });
});

const isAdminAuthed = t.middleware(async ({ next, ctx }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  // we have to fetch using clerkClient since auth.user is undefined for some reason
  const clerkId = ctx.auth.userId;
  const clerkUser = await clerkClient.users.getUser(clerkId);

  // protect every route
  if (clerkUser.publicMetadata.isAdmin !== true) {
    // we should probably let user know they're not authorized
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx,
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);

/**
 * Admin (authenticated and authorized) procedure
 *
 * These procedures are only available to admins.
 * Should be used for all admin dashboard functionality.
 *
 */
export const adminProcedure = t.procedure.use(isAuthed).use(isAdminAuthed);
