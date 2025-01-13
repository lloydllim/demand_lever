import {
  IPostUserModel,
  IUpdatedUserClient,
  IUpdateUserModel,
} from "@/lib/user/entities/user.model";
import { User } from "@prisma/client";

// todo refactor to use zod as source of truth
export interface IUserRepository {
  create(user: IPostUserModel): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByStripeCustomerId(stripeCustomerId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByEmailAndReturnPassword(email: string): Promise<string | null>;
  findByIdAsClient(id: string): Promise<User | null>;

  updateById(id: string, input: Partial<IUpdateUserModel>): Promise<User>;

  updateClientByUserId(
    userId: string,
    input: Partial<IUpdatedUserClient>
  ): Promise<User>;
}
