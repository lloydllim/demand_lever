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
  hasCompletedOnboarding: z.boolean(),

  /**
   * Client fields
   */

  // sign
  agreementAccepted: z.boolean().optional(),
  expectationAccepted: z.boolean().optional(),
  termsAndPrivacyAccepted: z.boolean().optional(),

  // profile
  phoneNumber: z.string().nullable(),
  linkedinUrl: z.string().url().nullable(),
  referralFor: z.enum(["279", "499"]).nullable(),

  // company
  companyName: z.string().nullable(),
  companyWebsite: z.string().url().nullable(),

  // marketing
  marketingValueProposition: z.string().nullable(),
  marketingIndustry: z.string().nullable(),
  marketingCompanySize: z
    .enum(["1-10", "11-20", "21-50", "51-100", "101+"])
    .nullable(),
  marketingPrefferedJobTitle: z.string().nullable(),
  marketingCalendlyLink: z.string().url().nullable(),
  marketingPreferences: z.string().nullable(),
  /**
   * End of client fields
   */

  // stripe
  stripeCustomerId: z.string().nullable(),
  stripeSubscriptionId: z.string().nullable(),
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

export const ReadUserModel = UserModel.omit({
  password: true,
  loginType: true,
});

export type IReadUserModel = z.infer<typeof ReadUserModel>;

export const UpdateUserModel = UserModel.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type IUpdateUserModel = z.infer<typeof UpdateUserModel>;

export const ReadUserClientModel = UserModel.pick({
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true,
  hasCompletedOnboarding: true,
  agreementAccepted: true,
  expectationAccepted: true,
  termsAndPrivacyAccepted: true,
  phoneNumber: true,
  linkedinUrl: true,
  companyName: true,
  companyWebsite: true,
  marketingValueProposition: true,
  marketingIndustry: true,
  marketingCompanySize: true,
  marketingPrefferedJobTitle: true,
  marketingCalendlyLink: true,
  marketingPreferences: true,
  stripeCustomerId: true,
  stripeSubscriptionId: true,
});

export type IReadUserClientModel = z.infer<typeof ReadUserClientModel>;

export const UpdateUserClient = ReadUserClientModel.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  name: true,
  email: true,
  hasCompletedOnboarding: true,
})
  .partial() // Start with optional fields (we'll enforce required manually)
  .superRefine((val, ctx) => {
    // Iterate over all fields and ensure none are undefined, null, or empty
    Object.entries(val).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "This field is required",
          path: [key], // Path corresponds to the specific field name
        });
      }
    });

    if (val.agreementAccepted === false) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You must accept the agreement",
        path: ["agreementAccepted"],
      });
    }

    if (val.expectationAccepted === false) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You must accept the expectation",
        path: ["expectationAccepted"],
      });
    }

    if (val.termsAndPrivacyAccepted === false) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You must accept the terms and privacy",
        path: ["termsAndPrivacyAccepted"],
      });
    }
  });

export type IUpdateUserClient = z.infer<typeof UpdateUserClient>;

export type IUpdatedUserClient = z.infer<typeof UpdateUserClient>;
