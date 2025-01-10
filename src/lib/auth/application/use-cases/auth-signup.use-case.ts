import { IAuthService } from "@/lib/auth/application/services/auth.service.interface";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IPostUserModel } from "@/lib/user/entities/user.model";

export type IAuthSignupUseCase = ReturnType<typeof AuthSignupUseCase>;

export const AuthSignupUseCase =
  (
    instrumentationService: IInstrumentationService,
    authService: IAuthService
  ) =>
  (user: IPostUserModel) => {
    return instrumentationService.startSpan(
      { name: "AuthSignupUseCase" },
      async () => {
        return await authService.signup(user);
      }
    );
  };
