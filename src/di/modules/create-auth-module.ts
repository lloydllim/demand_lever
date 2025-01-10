import { DI_SYMBOLS } from "@/di/types";
import { AuthSigninUseCase } from "@/lib/auth/application/use-cases/auth-signin.use-case";
import { AuthSignupUseCase } from "@/lib/auth/application/use-cases/auth-signup.use-case";
import { authVerifyTokenUseCase } from "@/lib/auth/application/use-cases/auth-verify-token.use-case";
import { AuthService } from "@/lib/auth/infrastructure/services/auth.service";
import { PostAuthSigninController } from "@/lib/auth/network-adapters/controller/post-auth-signin.controller";
import { PostAuthSignupController } from "@/lib/auth/network-adapters/controller/post-auth-signup.controller";
import { PostAuthVerifyTokenController } from "@/lib/auth/network-adapters/controller/post-auth-verify-token.controller";
import { createModule } from "@evyweb/ioctopus";

export const createAuthModule = () => {
  const authModule = createModule();

  authModule
    .bind(DI_SYMBOLS.IAuthService)
    .toClass(AuthService, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IUserRepository,
    ]);

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

  authModule
    .bind(DI_SYMBOLS.IAuthSignupUseCase)
    .toHigherOrderFunction(AuthSignupUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthService,
    ]);

  authModule
    .bind(DI_SYMBOLS.IPostAuthSignupController)
    .toHigherOrderFunction(PostAuthSignupController, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthSignupUseCase,
    ]);

  authModule
    .bind(DI_SYMBOLS.IAuthSigninUseCase)
    .toHigherOrderFunction(AuthSigninUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthService,
    ]);

  authModule
    .bind(DI_SYMBOLS.IPostAuthSigninController)
    .toHigherOrderFunction(PostAuthSigninController, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthSigninUseCase,
    ]);

  return authModule;
};
