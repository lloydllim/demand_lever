import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { INotificationRepository } from "@/lib/notification/application/repositories/notification.repository.interface";

export type IFindAllNotificationByUserIdUseCase = ReturnType<
  typeof findAllNotificationByUserIdUseCase
>;

export const findAllNotificationByUserIdUseCase =
  (
    instrumentationService: IInstrumentationService,
    notificationRespository: INotificationRepository
  ) =>
  (userId: string) => {
    return instrumentationService.startSpan(
      { name: "FindAllNotificationByUserIdUseCase" },
      async () => {
        return await notificationRespository.findAllByUserId(userId);
      }
    );
  };
