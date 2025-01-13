import { DI_SYMBOLS } from "@/di/types";
import { findUserByIdAsClientUseCase } from "@/lib/user/application/use-cases/find-user-by-id-as-client-use-case";
import { updateUserByIdAsClientUseCase } from "@/lib/user/application/use-cases/update-user-by-id-as-client.use-case";
import { UserRepository } from "@/lib/user/infrastructure/repositories/user.repository";
import { readUserByIdAsClientController } from "@/lib/user/network-adapters/controllers/read-user-by-id-as-client.controller";
import { updateUserByIdAsClientController } from "@/lib/user/network-adapters/controllers/update-user-by-id-as-client.controller";
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

  userModule
    .bind(DI_SYMBOLS.IUpdateUserByIdAsClientUseCase)
    .toHigherOrderFunction(updateUserByIdAsClientUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IUserRepository,
    ]);

  userModule
    .bind(DI_SYMBOLS.IUpdateUserByIdAsClientController)
    .toHigherOrderFunction(updateUserByIdAsClientController, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthService,
      DI_SYMBOLS.IUpdateUserByIdAsClientUseCase,
    ]);

  return userModule;
};
