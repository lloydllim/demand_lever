"use server";

import { cookieGetSessionOrJwt } from "@/app/actions/utils/cookie-get-session-or-jwt";
import { getInjection } from "@/di/container";
import { UnauthenticatedError } from "@/lib/auth/entities/auth.error";
import { InputParseError } from "@/lib/common/entities/controller.error";
import { ICreateCheckoutSessiosIdAsClientInput } from "@/lib/stripe/entities/stripe-client.types";

export const stripeCreateCheckoutSessionIdAction = async (
  input: ICreateCheckoutSessiosIdAsClientInput
) => {
  const instrumentationService = getInjection("IInstrumentationService");
  return await instrumentationService.instrumentServerAction(
    "stripeCreateCheckoutSessionIdAction",
    { recordResponse: true },
    async () => {
      try {
        const token = await cookieGetSessionOrJwt();

        const postStripeCreateCheckoutSessionIdAsClientController =
          getInjection("IPostStripeCreateCheckoutSessionIdAsClientController");
        const stripeSessionId =
          await postStripeCreateCheckoutSessionIdAsClientController({
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
