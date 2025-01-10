import env from "@/env";
import { IAuthService } from "@/lib/auth/application/services/auth.service.interface";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IUserRepository } from "@/lib/user/application/repositories/user.repository.interface";
import { IPostUserModel } from "@/lib/user/entities/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const AuthService = class implements IAuthService {
  constructor(
    private readonly instrumentationService: IInstrumentationService,
    private readonly userRepository: IUserRepository
  ) {}

  verifyToken(token: string) {
    return this.instrumentationService.startSpan(
      { name: "AuthService.verifyToken" },
      () => {
        return jwt.verify(token, env.JWT_TOKEN);
      }
    );
  }

  createToken(
    user_id: string,
    user_name: string,
    user_type: string,
    expiresIn: string
  ): string {
    return this.instrumentationService.startSpan(
      { name: "AuthService.createToken" },
      () => {
        return jwt.sign({ user_id, user_name, user_type }, env.JWT_TOKEN, {
          expiresIn,
        });
      }
    );
  }

  async signup(user: IPostUserModel): Promise<string> {
    return this.instrumentationService.startSpan(
      { name: "AuthService.signup" },
      async () => {
        user.password = await this.hashPassword(user.password);
        const createdUser = await this.userRepository.create(user);

        // todo fix dirty no enum check
        if (!createdUser.userType) {
          throw new Error("User type is required");
        }

        return this.createToken(
          createdUser.id,
          createdUser.name,
          createdUser.userType,
          "1h"
        );
      }
    );
  }

  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return this.instrumentationService.startSpan(
      { name: "AuthService.comparePassword" },
      async () => {
        return await bcrypt.compare(password, hashedPassword);
      }
    );
  }

  async hashPassword(password: string): Promise<string> {
    return this.instrumentationService.startSpan(
      { name: "AuthService.hashPassword" },
      async () => {
        return await bcrypt.hash(password, 10);
      }
    );
  }
};
