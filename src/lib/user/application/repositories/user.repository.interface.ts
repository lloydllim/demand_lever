import {
  IPostUserModel,
  IUpdatedUserClient,
} from "@/lib/user/entities/user.model";
import { User } from "@prisma/client";

// todo refactor to use zod as source of truth
export interface IUserRepository {
  create(user: IPostUserModel): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByEmailAndReturnPassword(email: string): Promise<string | null>;
  findByIdAsClient(id: string): Promise<User | null>;

  updateClientByUserId(
    userId: string,
    input: Partial<IUpdatedUserClient>
  ): Promise<User>;
}
