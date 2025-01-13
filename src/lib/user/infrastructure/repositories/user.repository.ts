import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IPrismaService } from "@/lib/prisma/application/services/prisma.service.interface";
import { IUserRepository } from "@/lib/user/application/repositories/user.repository.interface";
import {
  IPostUserModel,
  IUpdatedUserClient,
  IUpdateUserModel,
} from "@/lib/user/entities/user.model";
import { User } from "@prisma/client";

export const UserRepository = class implements IUserRepository {
  constructor(
    private readonly instrumentationService: IInstrumentationService,
    private readonly prismaService: IPrismaService
  ) {}

  async create(user: IPostUserModel): Promise<User> {
    return await this.instrumentationService.startSpan(
      { name: "UserRepository.create" },
      async () => {
        const prismaClient = this.prismaService.getClient();
        const createdUser = await prismaClient.user.create({
          data: {
            userType: user.userType,
            email: user.email,
            name: user.name,
            password: user.password,
            loginType: user.loginType,
          },
        });

        return createdUser;
      }
    );
  }

  async findById(id: string): Promise<User | null> {
    return await this.instrumentationService.startSpan(
      { name: "UserRepository.findById" },
      async () => {
        const prismaClient = this.prismaService.getClient();
        const user = await prismaClient.user.findUnique({
          where: {
            id: id,
          },
        });

        return user;
      }
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.instrumentationService.startSpan(
      { name: "UserRepository.findByEmail" },
      async () => {
        const prismaClient = this.prismaService.getClient();
        const user = await prismaClient.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) {
          return null;
        }

        return user;
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
            email: email,
          },
          select: {
            password: true,
          },
        });

        if (!user) {
          return null;
        }

        return user.password;
      }
    );
  }

  async findByIdAsClient(id: string): Promise<User | null> {
    return await this.instrumentationService.startSpan(
      { name: "UserRepository.findByIdAsClient" },
      async () => {
        const prismaClient = this.prismaService.getClient();
        const user = await prismaClient.user.findUnique({
          where: {
            id: id,
            userType: "clients",
          },
        });

        if (!user) {
          return null;
        }

        return user;
      }
    );
  }

  async findByStripeCustomerId(
    stripeCustomerId: string
  ): Promise<User | null> {
    return await this.instrumentationService.startSpan(
      { name: "UserRepository.findByStripeCustomerId" },
      async () => {
        const prismaClient = this.prismaService.getClient();
        const user = await prismaClient.user.findFirst({
          where: {
            stripeCustomerId: stripeCustomerId,
          },
        });

        if (!user) {
          return null;
        }

        return user;
      }
    );
  }

  async updateById(
    id: string,
    input: Partial<IUpdateUserModel>
  ): Promise<User> {
    return await this.instrumentationService.startSpan(
      { name: "UserRepository.updateById" },
      async () => {
        const prismaClient = this.prismaService.getClient();
        const updatedUser = await prismaClient.user.update({
          where: {
            id: id,
          },
          data: input,
        });

        return updatedUser;
      }
    );
  }

  async updateClientByUserId(
    userId: string,
    input: Partial<IUpdatedUserClient>
  ): Promise<User> {
    return await this.instrumentationService.startSpan(
      { name: "UserRepository.updateClientByUserId" },
      async () => {
        const prismaClient = this.prismaService.getClient();
        const updatedUser = await prismaClient.user.update({
          where: {
            id: userId,
          },
          data: {
            ...input,
          },
        });

        return updatedUser;
      }
    );
  }
};
