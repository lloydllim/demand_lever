import { DI_SYMBOLS } from "@/di/types";
import { UserRepository } from "@/lib/user/infrastructure/repositories/user.repository";
import { createModule } from "@evyweb/ioctopus";

export const createUserModule = () => {
  const userModule = createModule();

  userModule
    .bind(DI_SYMBOLS.IUserRepository)
    .toClass(UserRepository, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IPrismaService,
    ]);

  return userModule;
};
