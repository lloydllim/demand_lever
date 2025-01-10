import { DI_SYMBOLS } from "@/di/types";
import { authVerifyTokenUseCase } from "@/lib/auth/application/use-cases/auth-verify-token.use-case";
import { AuthService } from "@/lib/auth/infrastructure/services/auth.service";
import { PostAuthVerifyTokenController } from "@/lib/auth/network-adapters/controller/post-auth-verify-token.controller";
import { createModule } from "@evyweb/ioctopus";

export const createAuthModule = () => {
  const authModule = createModule();

  authModule
    .bind(DI_SYMBOLS.IAuthService)
    .toClass(AuthService, [DI_SYMBOLS.IInstrumentationService]);

  authModule
    .bind(DI_SYMBOLS.IAuthVerifyTokenUseCase)
    .toHigherOrderFunction(authVerifyTokenUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthService,
    ]);

  authModule
    .bind(DI_SYMBOLS.IPostAuthVerifyTokenController)
    .toHigherOrderFunction(PostAuthVerifyTokenController, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthVerifyTokenUseCase,
    ]);

  return authModule;
};
