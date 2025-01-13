import { IAuth } from "@/lib/auth/entities/auth.type";
import { IPostUserModel } from "@/lib/user/entities/user.model";

export interface IAuthService {
  verifyToken(token: string): IAuth;

  createToken(
    user_id: string,
    user_name: string,
    user_type: string,
    expiresIn: string
  ): string;

  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;

  signup(user: IPostUserModel): Promise<string>;
  signin(email: string, password: string): Promise<string | null>;
}
