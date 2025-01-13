import { DI_SYMBOLS } from "@/di/types";
import { findUserByIdAsClientUseCase } from "@/lib/user/application/use-cases/find-user-by-id-as-client-use-case";
import { UserRepository } from "@/lib/user/infrastructure/repositories/user.repository";
import { readUserByIdAsClientController } from "@/lib/user/network-adapters/controllers/read-user-by-id-as-client.controller";
import { createModule } from "@evyweb/ioctopus";

export const createUserModule = () => {
  const userModule = createModule();

  userModule
    .bind(DI_SYMBOLS.IUserRepository)
    .toClass(UserRepository, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IPrismaService,
    ]);

  userModule
    .bind(DI_SYMBOLS.IFindUserByIdAsClientUseCase)
    .toHigherOrderFunction(findUserByIdAsClientUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IUserRepository,
    ]);

  userModule
    .bind(DI_SYMBOLS.IReadUserByIdAsClientController)
    .toHigherOrderFunction(readUserByIdAsClientController, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthService,
      DI_SYMBOLS.IFindUserByIdAsClientUseCase,
    ]);

  return userModule;
};
