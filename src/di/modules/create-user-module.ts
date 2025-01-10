import { DI_SYMBOLS } from "@/di/types";
import { userFindByIdAsClientUseCase } from "@/lib/user/application/use-cases/user-find-by-id-as-client.use-case";
import { UserRepository } from "@/lib/user/infrastructure/repositories/user.repository";
import { userFindByIdAsClientController } from "@/lib/user/network-adapters/controllers/user-find-by-id-as-client.controller";
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
    .bind(DI_SYMBOLS.IUserFindByIdAsClientUseCase)
    .toHigherOrderFunction(userFindByIdAsClientUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IUserRepository,
    ]);

  userModule
    .bind(DI_SYMBOLS.IUserFindByIdAsClientController)
    .toHigherOrderFunction(userFindByIdAsClientController, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IUserFindByIdAsClientUseCase,
    ]);

  return userModule;
};
