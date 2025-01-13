import { JwtPayload } from "jsonwebtoken";

export type IAuth = {
  user_id: string;
  user_name: string;
  user_type: string;
} & JwtPayload;
