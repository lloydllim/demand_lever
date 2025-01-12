import { IToken } from "@/app/actions/auth/utils/token.type";
import { cookieGetSessionOrJwt } from "@/app/actions/utils/cookie-get-session-or-jwt";
import { getInjection } from "@/di/container";

export const readAllNotificationByUserIdAction = () => {
  const instrumentationService = getInjection("IInstrumentationService");
  return instrumentationService.instrumentServerAction(
    "ReadAllNotificationByUserIdAction",
    { recordResponse: true },
    async () => {
      const session = await cookieGetSessionOrJwt();

      if (!session) {
        throw new Error("Unauthorized");
      }

      const userId = (session as unknown as IToken).user_id as string;
      const readAllNotificationByUserIdController = getInjection(
        "IReadAllNotificationByUserIdController"
      );
      return await readAllNotificationByUserIdController({ userId });
    }
  );
};
