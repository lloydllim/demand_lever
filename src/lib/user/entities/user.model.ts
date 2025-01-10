import { z } from "zod";

export const UserModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),

  loginType: z.enum(["manual"]),
  userType: z.enum(["clients"]).nullable(),
});

export type IUserModel = z.infer<typeof UserModel>;

export const PostUserModel = UserModel.pick({
  name: true,
  email: true,
  password: true,
  userType: true,
  loginType: true,
});

export type IPostUserModel = z.infer<typeof PostUserModel>;

export const ReadUserMode = UserModel.omit({
  password: true,
  loginType: true,
});

export type IReadUserModel = z.infer<typeof ReadUserMode>;
