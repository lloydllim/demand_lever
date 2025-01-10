"use server";
import { cookieGetSessionOrJwt } from "@/app/actions/utils/cookie-get-session-or-jwt";
import { getInjection } from "@/di/container";

export const authVerifyTokenAction = async () => {
  const instrumentationService = getInjection("IInstrumentationService");

  return instrumentationService.instrumentServerAction(
    "AuthVerifyTokenAction",
    { recordResponse: false },
    async () => {
      const cookieSessionOrJwtValue = await cookieGetSessionOrJwt();

      if (!cookieSessionOrJwtValue) {
        return "";
      }

      const PostAuthVerifyTokenController = getInjection(
        "IPostAuthVerifyTokenController"
      );

      const result = await PostAuthVerifyTokenController({
        token: cookieSessionOrJwtValue,
      });

      return result;
    }
  );
};
