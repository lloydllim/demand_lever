"use server";

import { cookieGetSessionOrJwt } from "@/app/actions/utils/cookie-get-session-or-jwt";
import { getInjection } from "@/di/container";
import { UnauthenticatedError } from "@/lib/auth/entities/auth.error";
import { InputParseError } from "@/lib/common/entities/controller.error";

export const readAllNotificationByUserIdAction = async () => {
  const instrumentationService = getInjection("IInstrumentationService");
  return instrumentationService.instrumentServerAction(
    "ReadAllNotificationByUserIdAction",
    { recordResponse: true },
    async () => {
      const session = await cookieGetSessionOrJwt();
      try {
        const readAllNotificationByUserIdController = getInjection(
          "IReadAllNotificationByUserIdController"
        );

        const notifications = await readAllNotificationByUserIdController({
          token: session,
        });

        return {
          data: notifications,
        };
      } catch (error) {
        if (error instanceof UnauthenticatedError) {
          return {
            error: "Unauthenticated. Not signed in.",
          };
        }

        if (error instanceof InputParseError) {
          return {
            error: "Failed to get notifications.",
          };
        }

        const crashReporterService = getInjection("ICrashReporterService");
        crashReporterService.report(error);
        return {
          error:
            "An error happened while fetching notifications. The developers has been notified. Please try again later.",
        };
      }
    }
  );
};
