"use server";

import { getInjection } from "@/di/container";
import { IPostUserModel } from "@/lib/user/entities/user.model";
import { cookies } from "next/headers";

export const authPostSignupAction = async (input: IPostUserModel) => {
  const cookieStore = await cookies();
  const instrumentationService = getInjection("IInstrumentationService");

  return instrumentationService.instrumentServerAction(
    "authPostSignupAction",
    { recordResponse: false },
    async () => {
      const authSignupUseCase = getInjection("IAuthSignupUseCase");
      const token = await authSignupUseCase(input);

      cookieStore.set("session", token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24, // 1 day
      });
    }
  );
};
