"use server";

import { cookieGetSessionOrJwt } from "@/app/actions/utils/cookie-get-session-or-jwt";
import { getInjection } from "@/di/container";
import { UnauthenticatedError } from "@/lib/auth/entities/auth.error";
import { InputParseError } from "@/lib/common/entities/controller.error";
import { z } from "zod";

const inputData = z.object({
  sdrManagerQuantity: z.number().int().max(1),
  sdrQuantity: z.number().int(),
  sdrDataPackage: z.enum(["299", "499"]),
  payrollFeeAmount: z.number().int(),
});

export const stripeCreateCheckoutSessionIdAction = async (
  input: z.infer<typeof inputData>
) => {
  const instrumentationService = getInjection("IInstrumentationService");
  return await instrumentationService.instrumentServerAction(
    "stripeCreateCheckoutSessionIdAction",
    { recordResponse: true },
    async () => {
      try {
        const token = await cookieGetSessionOrJwt();

        const postStripeCreateCheckoutSessionIdController = getInjection(
          "IPostStripeCreateCheckoutSessionIdController"
        );
        const stripeSessionId =
          await postStripeCreateCheckoutSessionIdController({
            ...input,
            token: token,
          });

        return {
          data: stripeSessionId,
        };
      } catch (error) {
        if (error instanceof UnauthenticatedError) {
          return {
            error: "Unauthenticated. Sign in to continue.",
          };
        }

        if (error instanceof InputParseError) {
          return {
            error: "Invalid input.",
          };
        }

        const crashReporterService = getInjection("ICrashReporterService");
        crashReporterService.report(error);

        return {
          error:
            "An error happened creating the checkout session. The team has been notified. Please try again later.",
        };
      }
    }
  );
};
