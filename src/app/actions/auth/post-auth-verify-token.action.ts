"use server";
import { cookieGetSessionOrJwt } from "@/app/actions/utils/cookie-get-session-or-jwt";
import { getInjection } from "@/di/container";
import { UnauthenticatedError } from "@/lib/auth/entities/auth.error";
import { InputParseError } from "@/lib/common/entities/controller.error";
import { TokenExpiredError } from "jsonwebtoken";

export const postAuthVerifyTokenAction = async () => {
  const instrumentationService = getInjection("IInstrumentationService");
  return instrumentationService.instrumentServerAction(
    "postAuthVerifyTokenAction",
    { recordResponse: false },
    async () => {
      try {
        const cookieSessionOrJwtValue = await cookieGetSessionOrJwt();

        const PostAuthVerifyTokenController = getInjection(
          "IPostAuthVerifyTokenController"
        );

        const result = PostAuthVerifyTokenController({
          token: cookieSessionOrJwtValue,
        });

        return {
          data: result,
        };
      } catch (error) {
        if (error instanceof InputParseError) {
          return {
            error: "Invalid token.",
          };
        }

        if (error instanceof UnauthenticatedError) {
          return {
            error: "Unauthenticated not signed in.",
          };
        }

        if (error instanceof TokenExpiredError) {
          return {
            error: "Token expired. Please sign in again.",
          };
        }

        const crashReporterService = getInjection("ICrashReporterService");
        crashReporterService.report(error);
        return {
          error:
            "An error happened while verifying token. The team have been notified. Please try again later.",
        };
      }
    }
  );
};
