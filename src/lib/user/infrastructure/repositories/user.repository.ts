import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IPrismaService } from "@/lib/prisma/application/services/prisma.service.interface";
import { IUserRepository } from "@/lib/user/application/repositories/user.repository.interface";
import {
  IPostUserModel,
  IReadUserModel,
} from "@/lib/user/entities/user.model";

export const UserRepository = class implements IUserRepository {
  constructor(
    private readonly instrumentationService: IInstrumentationService,
    private readonly prismaService: IPrismaService
  ) {}

  async create(user: IPostUserModel): Promise<IReadUserModel> {
    return await this.instrumentationService.startSpan(
      { name: "UserRepository.create" },
      async () => {
        const prismaClient = this.prismaService.getClient();
        const createdUser = await prismaClient.user.create({
          data: {
            user_type: user.userType,
            user_email: user.email,
            user_name: user.name,
            user_password: user.password,
            user_login_type: user.loginType,
          },
        });

        return {
          id: createdUser.user_id,
          createdAt: createdUser.createdAt,
          updatedAt: createdUser.updatedAt,
          name: createdUser.user_name,
          email: createdUser.user_email,
          userType: createdUser.user_type as IReadUserModel["userType"],
        };
      }
    );
  }
};
