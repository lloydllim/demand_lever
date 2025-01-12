import { z } from "zod";

export const NotificationModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

  userId: z.string(),
  message: z.string(),
});

export type INotificationModel = z.infer<typeof NotificationModel>;

export const PostNotificationModel = NotificationModel.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type IPostNotificationModel = z.infer<typeof PostNotificationModel>;
