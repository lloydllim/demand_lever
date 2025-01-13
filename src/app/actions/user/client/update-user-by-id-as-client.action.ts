"use server";

import { cookieGetSessionOrJwt } from "@/app/actions/utils/cookie-get-session-or-jwt";
import { getInjection } from "@/di/container";
import { UnauthenticatedError } from "@/lib/auth/entities/auth.error";
import { InputParseError } from "@/lib/common/entities/controller.error";
import { IUpdateUserClient } from "@/lib/user/entities/user.model";

export const updateUserByIdAsClientAction = async (
  input: IUpdateUserClient
) => {
  const instrumentationService = getInjection("IInstrumentationService");
  return instrumentationService.instrumentServerAction(
    "updateUserByIdAsClientAction",
    { recordResponse: true },
    async () => {
      try {
        const token = await cookieGetSessionOrJwt();
        const updateUserByIdAsClientController = getInjection(
          "IUpdateUserByIdAsClientController"
        );

        const result = await updateUserByIdAsClientController({
          token,
          user: input,
        });

        return { data: result };
      } catch (error) {
        if (error instanceof InputParseError) {
          return {
            error: "Invalid data",
          };
        }

        if (error instanceof UnauthenticatedError) {
          return {
            error: "Unautnenticated",
          };
        }

        const crashReporterService = getInjection("ICrashReporterService");
        crashReporterService.report(error);

        return {
          error:
            "Something went wrong. The team has been notified. Please try again later.",
        };
      }
    }
  );
};
