import type { ExpoPushMessage } from "expo-server-sdk";
import { Expo } from "expo-server-sdk";
import { z } from "zod";

import { logger } from "@cfd/logger";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

export const pushNotification = async (
  pushTokens: string[],
  title?: string,
  body?: string,
  subtitle?: string,
) => {
  // Create notification messages
  const messages: ExpoPushMessage[] = pushTokens
    .filter((pushToken) => Expo.isExpoPushToken(pushToken))
    .map((pushToken) => ({
      to: pushToken,
      sound: "default",
      title: title,
      body: body,
      subtitle: subtitle,
    }));

  // Send the messages
  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];
  await (async () => {
    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        logger.error(error);
      }
    }
  })();
};

export const notificationRouter = createTRPCRouter({
  push: adminProcedure
    .input(
      z.object({
        pushTokens: z.array(z.string()),
        title: z.string().optional(),
        body: z.string().optional(),
        subtitle: z.string().optional(),
        // TODO: add optional data payload
      }),
    )
    .mutation(async ({ input }) => {
      await pushNotification(
        input.pushTokens,
        input.title,
        input.body,
        input.subtitle,
      );
    }),
  register: protectedProcedure
    .input(
      z.object({
        pushToken: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.userId;
      await ctx.db.pushToken.create({
        data: {
          token: input.pushToken,
          userId,
        },
      });
    }),
});
