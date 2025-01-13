import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { INotificationRepository } from "@/lib/notification/application/repositories/notification.repository.interface";

export type IUpdateAllNotificationByIdsToReadUseCase = ReturnType<
  typeof updateAllNotificationByIdsToReadUseCase
>;

export const updateAllNotificationByIdsToReadUseCase =
  (
    instrumentationService: IInstrumentationService,
    notificationRepository: INotificationRepository
  ) =>
  (notificationIds: string[]): Promise<number> => {
    return instrumentationService.startSpan(
      { name: "updateAllNotificationByIdsToRead" },
      async () => {
        const notificationsUpdatedCount =
          await notificationRepository.updateAllByNotificationIdsToRead(
            notificationIds
          );

        return notificationsUpdatedCount;
      }
    );
  };
