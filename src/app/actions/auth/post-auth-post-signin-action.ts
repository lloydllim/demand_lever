"use server";

import { getInjection } from "@/di/container";
import { InputParseError } from "@/lib/common/entities/controller.error";
import { cookies } from "next/headers";

export const postAuthSigninAction = async (
  email: string,
  password: string
) => {
  const cookieStore = await cookies();
  const instrumentationService = getInjection("IInstrumentationService");

  return instrumentationService.instrumentServerAction(
    "postAuthSigninAction",
    { recordResponse: false },
    async () => {
      try {
        const authPostSigninController = getInjection(
          "IPostAuthSigninController"
        );

        const { token } = await authPostSigninController({ email, password });

        cookieStore.set("session", token, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 24, // 1 day
        });

        return {
          data: "Successfully signed in.",
        };
      } catch (error) {
        if (error instanceof InputParseError) {
          return { error: "Invalid data." };
        }

        const crashReporterService = getInjection("ICrashReporterService");
        crashReporterService.report(error);

        return {
          error:
            "An error occured while signing in. The team has been notified. Please try again later.",
        };
      }
    }
  );
};
