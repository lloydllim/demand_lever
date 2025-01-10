import { getInjection } from "@/di/container";
import { IPostUserModel } from "@/lib/user/entities/user.model";

export const authPostSignupAction = (input: IPostUserModel) => {
  const instrumentationService = getInjection("IInstrumentationService");

  return instrumentationService.instrumentServerAction(
    "authPostSignupAction",
    { recordResponse: false },
    async () => {
      const authSignupUseCase = getInjection("IAuthSignupUseCase");
      const token = await authSignupUseCase(input);
      return token;
    }
  );
};
