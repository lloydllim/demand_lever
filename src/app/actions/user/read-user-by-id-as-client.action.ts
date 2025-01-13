"use server";

import { cookieGetSessionOrJwt } from "@/app/actions/utils/cookie-get-session-or-jwt";
import { getInjection } from "@/di/container";
import { UnauthenticatedError } from "@/lib/auth/entities/auth.error";
import { TokenExpiredError } from "jsonwebtoken";

export const ReadUserByIdAsClientAction = async () => {
  const instrumentationService = getInjection("IInstrumentationService");
  return instrumentationService.instrumentServerAction(
    "ReadUserByIdAsClientAction",
    { recordResponse: true },
    async () => {
      try {
        const session = await cookieGetSessionOrJwt();

        if (!session) {
          throw new UnauthenticatedError("Not authenticated");
        }

        const readUserByIdAsClientController = getInjection(
          "IReadUserByIdAsClientController"
        );

        const response = await readUserByIdAsClientController({
          token: session,
        });

        return {
          result: response,
        };
      } catch (error) {
        if (error instanceof UnauthenticatedError) {
          return {
            error: "Unauthenticated. Sign in to continue.",
          };
        }

        if (error instanceof TokenExpiredError) {
          return {
            error: "Token expired. Sign in to continue.",
          };
        }

        const crashReporterService = getInjection("ICrashReporterService");
        crashReporterService.report(error);
        return {
          error:
            "An error occurred. The team has been notified. Please try again later.",
        };
      }
    }
  );
};
