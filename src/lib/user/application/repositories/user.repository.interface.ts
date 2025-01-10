import {
  IPostUserModel,
  IReadUserModel,
} from "@/lib/user/entities/user.model";

export interface IUserRepository {
  create(user: IPostUserModel): Promise<IReadUserModel>;
}
