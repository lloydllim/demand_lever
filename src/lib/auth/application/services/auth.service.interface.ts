import { JwtPayload } from "jsonwebtoken";

export interface IAuthService {
  verifyToken(token: string): string | JwtPayload;
}
