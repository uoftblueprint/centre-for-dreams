import type { ExpoPushMessage } from "expo-server-sdk";
import { Expo } from "expo-server-sdk";
import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "../trpc";

const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

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
      // Create notification messages
      const messages: ExpoPushMessage[] = input.pushTokens
        .filter((pushToken) => Expo.isExpoPushToken(pushToken))
        .map((pushToken) => ({
          to: pushToken,
          sound: "default",
          title: input.title,
          body: input.body,
          subtitle: input.subtitle,
        }));

      // Send the messages
      const chunks = expo.chunkPushNotifications(messages);
      const tickets = [];
      await (async () => {
        for (const chunk of chunks) {
          try {
            const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            console.log(ticketChunk);
            tickets.push(...ticketChunk);
          } catch (error) {
            console.error(error);
          }
        }
      })();
    }),
});