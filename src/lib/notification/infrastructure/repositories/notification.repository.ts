import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { INotificationRepository } from "@/lib/notification/application/repositories/notification.repository.interface";
import {
  INotificationModel,
  IPostNotificationModel,
} from "@/lib/notification/entities/notification.model";
import { IPrismaService } from "@/lib/prisma/application/services/prisma.service.interface";

export const NotificationRepository = class
  implements INotificationRepository
{
  constructor(
    private readonly instrumentationService: IInstrumentationService,
    private readonly prismaService: IPrismaService
  ) {}

  async create(input: IPostNotificationModel): Promise<INotificationModel> {
    return await this.instrumentationService.startSpan(
      { name: "NotificationRepository.create" },
      async () => {
        const prismaClient = this.prismaService.getClient();
        const notification = await prismaClient.notification.create({
          data: input,
        });

        return notification;
      }
    );
  }

  async findAllByUserId(userId: string): Promise<INotificationModel[]> {
    return await this.instrumentationService.startSpan(
      { name: "NotificationRepository.findAllByUserId" },
      async () => {
        const prismaClient = this.prismaService.getClient();
        const notifications = await prismaClient.notification.findMany({
          where: {
            userId,
          },
        });

        return notifications;
      }
    );
  }
};
