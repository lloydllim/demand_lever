import { IAuthService } from "@/lib/auth/application/services/auth.service.interface";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";

export type IAuthVerifyTokenUseCase = ReturnType<typeof authVerifyTokenUseCase>;

export const authVerifyTokenUseCase =
  (
    instrumentationService: IInstrumentationService,
    authService: IAuthService
  ) =>
  (token: string) => {
    return instrumentationService.startSpan(
      { name: "AuthVerifyTokenUseCase" },
      () => {
        return authService.verifyToken(token);
      }
    );
  };
