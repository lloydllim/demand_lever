import {
  IPostUserModel,
  IReadUserModel,
} from "@/lib/user/entities/user.model";

export interface IUserRepository {
  create(user: IPostUserModel): Promise<IReadUserModel>;
  findByEmail(email: string): Promise<IReadUserModel | null>;
  findByEmailAndReturnPassword(email: string): Promise<string | null>;
}
