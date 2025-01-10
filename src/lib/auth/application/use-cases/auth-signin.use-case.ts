import { IAuthService } from "@/lib/auth/application/services/auth.service.interface";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";

export type IAuthSigninUseCase = ReturnType<typeof AuthSigninUseCase>;

export const AuthSigninUseCase =
  (
    instrumentationService: IInstrumentationService,
    authService: IAuthService
  ) =>
  (email: string, password: string) => {
    return instrumentationService.startSpan(
      { name: "AuthSigninUseCase" },
      async () => {
        return await authService.signin(email, password);
      }
    );
  };
