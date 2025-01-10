"use server";

import { getInjection } from "@/di/container";
import { cookies } from "next/headers";

export const authPostSigninAction = async (
  email: string,
  password: string
) => {
  const cookieStore = await cookies();
  const instrumentationService = getInjection("IInstrumentationService");

  return instrumentationService.instrumentServerAction(
    "authPostSigninAction",
    { recordResponse: false },
    async () => {
      const authPostSigninController = getInjection(
        "IPostAuthSigninController"
      );

      const { token } = await authPostSigninController({ email, password });

      cookieStore.set("session", token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24, // 1 day
      });
    }
  );
};
