import { getInjection } from "@/di/container";

export const userFindByIdAsClientAction = async (userId: string) => {
  const instrumentationService = getInjection("IInstrumentationService");

  return instrumentationService.instrumentServerAction(
    "UserFindByIdAsClientAction",
    { recordResponse: true },
    async () => {
      const UserFindByIdAsClientController = getInjection(
        "IUserFindByIdAsClientController"
      );

      const result = await UserFindByIdAsClientController({
        userId: userId,
      });

      return result;
    }
  );
};
