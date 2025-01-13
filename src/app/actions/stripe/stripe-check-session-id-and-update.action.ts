import { cookieGetSessionOrJwt } from "@/app/actions/utils/cookie-get-session-or-jwt";
import { getInjection } from "@/di/container";
import { InputParseError } from "@/lib/common/entities/controller.error";
import Stripe from "stripe";

export const stripeCheckSessionIdAndUpdateAction = (sessionId: string) => {
  const instrumentationService = getInjection("IInstrumentationService");
  return instrumentationService.instrumentServerAction(
    "stripeCheckSessionIdAndUpdateAction",
    { recordResponse: true },
    async () => {
      try {
        const token = await cookieGetSessionOrJwt();
        const stripeCheckSessionIdAndUpdateController = getInjection(
          "IPostStripeCheckSessionIdAndUpdateController"
        );
        const result = await stripeCheckSessionIdAndUpdateController({
          sessionId,
          token,
        });

        return {
          result,
        };
      } catch (error) {
        if (error instanceof InputParseError) {
          return {
            error: "Failed to check session id.",
          };
        }

        if (error instanceof Stripe.errors.StripeInvalidRequestError) {
          return {
            result: false,
          };
        }

        const crashReporterService = getInjection("ICrashReporterService");
        crashReporterService.report(error);
        return {
          error: "An error happened while checking session id.",
        };
      }
    }
  );
};
