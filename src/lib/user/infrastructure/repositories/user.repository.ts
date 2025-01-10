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

  async findByEmail(email: string): Promise<IReadUserModel | null> {
    return await this.instrumentationService.startSpan(
      { name: "UserRepository.findByEmail" },
      async () => {
        const prismaClient = this.prismaService.getClient();
        const user = await prismaClient.user.findUnique({
          where: {
            user_email: email,
          },
        });

        if (!user) {
          return null;
        }

        return {
          id: user.user_id,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          name: user.user_name,
          email: user.user_email,
          userType: user.user_type as IReadUserModel["userType"],
        };
      }
    );
  }

  async findByEmailAndReturnPassword(email: string): Promise<string | null> {
    return await this.instrumentationService.startSpan(
      { name: "UserRepository.findByEmailAndReturnPassword" },
      async () => {
        const prismaClient = this.prismaService.getClient();
        const user = await prismaClient.user.findUnique({
          where: {
            user_email: email,
          },
          select: {
            user_password: true,
          },
        });

        if (!user) {
          return null;
        }

        return user.user_password;
      }
    );
  }
};
