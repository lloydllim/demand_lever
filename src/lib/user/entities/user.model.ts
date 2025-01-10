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

export const UserClientModel = UserModel.extend({
  hasCompletedOnboarding: z.boolean(),

  // sign
  agreementAccepted: z.boolean().nullable(),
  expectationAccepted: z.boolean(),
  termsAndPrivacyAccepted: z.boolean(),

  // profile
  phoneNumber: z.string(),
  linkedinUrl: z.string().url(),
  referralFor: z.enum(["279", "499"]),

  // company
  companyName: z.string(),
  companyWebsite: z.string().url(),

  // marketing
  marketingValueProposition: z.string(),
  marketingIndustry: z.string(),
  marketingCompanySize: z.enum(["1-10", "11-20", "21-50", "51-100", "101+"]),
  marketingPrefferedJobTitle: z.string(),
  marketingCalendlyLink: z.string().url(),
  marketingPreferences: z.string(),
});

export type IUserClientModel = z.infer<typeof UserClientModel>;

export const UserClientPostModel = UserClientModel.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type IUserClientPostModel = z.infer<typeof UserClientPostModel>;

export const ReadUserClientModel = UserClientModel.omit({
  password: true,
});

export type IReadUserClientModel = z.infer<typeof ReadUserClientModel>;
