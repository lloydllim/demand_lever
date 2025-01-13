"use server";

import { getInjection } from "@/di/container";
import { InputParseError } from "@/lib/common/entities/controller.error";
import { IPostUserModel } from "@/lib/user/entities/user.model";
import { cookies } from "next/headers";

export const postAuthSignupAction = async (input: IPostUserModel) => {
  const cookieStore = await cookies();
  const instrumentationService = getInjection("IInstrumentationService");

  return instrumentationService.instrumentServerAction(
    "postAuthSignupAction",
    { recordResponse: false },
    async () => {
      try {
        const postAuthSignupController = getInjection(
          "IPostAuthSignupController"
        );

        const { token } = await postAuthSignupController(input);

        cookieStore.set("session", token, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 24, // 1 day
        });

        return {
          data: "Successfully signed up.",
        };
      } catch (error) {
        if (error instanceof InputParseError) {
          return {
            error: "Sign up failed due to invalid data.",
          };
        }

        const crashReporterService = getInjection("ICrashReporterService");
        crashReporterService.report(error);
        return {
          error:
            "An error happened while signing up. The developers have been notified. Please try again later.",
        };
      }
    }
  );
};
