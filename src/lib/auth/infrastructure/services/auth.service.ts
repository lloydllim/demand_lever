import env from "@/env";
import { IAuthService } from "@/lib/auth/application/services/auth.service.interface";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import jwt from "jsonwebtoken";

export const AuthService = class implements IAuthService {
  constructor(
    private readonly instrumentationService: IInstrumentationService
  ) {}

  verifyToken(token: string) {
    return this.instrumentationService.startSpan(
      { name: "AuthService.verifyToken" },
      () => {
        return jwt.verify(token, env.JWT_TOKEN);
      }
    );
  }
};
