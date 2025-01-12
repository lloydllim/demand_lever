import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { INotificationRepository } from "@/lib/notification/application/repositories/notification.repository.interface";
import { IPostNotificationModel } from "@/lib/notification/entities/notification.model";

export type ICreateNotificationUseCase = ReturnType<
  typeof createNotificationUseCase
>;

export const createNotificationUseCase =
  (
    instrumentationService: IInstrumentationService,
    notificationRespository: INotificationRepository
  ) =>
  (input: IPostNotificationModel) => {
    return instrumentationService.startSpan(
      { name: "CreateNotificationUseCase" },
      async () => {
        return await notificationRespository.create(input);
      }
    );
  };
