import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { appRouter } from "./src/root";
import type { AppRouter } from "./src/root";
import { createCallerFactory } from "./src/trpc";

export { appRouter, type AppRouter } from "./src/root";
export { createTRPCContext, createCallerFactory } from "./src/trpc";

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const createCaller = createCallerFactory(appRouter);
