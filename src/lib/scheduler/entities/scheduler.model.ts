import { z } from "zod";

export const SchedulerModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

  userId: z.string(),
});

export type ISchedulerModel = z.infer<typeof SchedulerModel>;

export const ReadUserModel = SchedulerModel.pick({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export type IReadUserModel = z.infer<typeof ReadUserModel>;
