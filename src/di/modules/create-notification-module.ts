import { DI_SYMBOLS } from "@/di/types";
import { createNotificationUseCase } from "@/lib/notification/application/use-cases/create-notification.use-case";
import { findAllNotificationByUserIdUseCase } from "@/lib/notification/application/use-cases/find-all-notification-by-user-id.use-case";
import { updateAllNotificationByIdsToReadUseCase } from "@/lib/notification/application/use-cases/update-all-notification-by-ids-to-read.use-case";
import { NotificationRepository } from "@/lib/notification/infrastructure/repositories/notification.repository";
import { readAllNotificationByUserIdController } from "@/lib/notification/network-adapters/controllers/read-all-notification-by-user-id.controller";
import { updateAllNotificationByIdsToReadController } from "@/lib/notification/network-adapters/controllers/update-all-notification-by-ids-to-read.controller";
import { createModule } from "@evyweb/ioctopus";

export const createNotificationModule = () => {
  const notificationModule = createModule();

  notificationModule
    .bind(DI_SYMBOLS.INotificationRepository)
    .toClass(NotificationRepository, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IPrismaService,
    ]);

  notificationModule
    .bind(DI_SYMBOLS.ICreateNotificationUseCase)
    .toHigherOrderFunction(createNotificationUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.INotificationRepository,
    ]);

  notificationModule
    .bind(DI_SYMBOLS.IFindAllNotificationByUserIdUseCase)
    .toHigherOrderFunction(findAllNotificationByUserIdUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.INotificationRepository,
    ]);

  notificationModule
    .bind(DI_SYMBOLS.IReadAllNotificationByUserIdController)
    .toHigherOrderFunction(readAllNotificationByUserIdController, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthService,
      DI_SYMBOLS.IFindAllNotificationByUserIdUseCase,
    ]);

  notificationModule
    .bind(DI_SYMBOLS.IUpdateAllNotificationByIdsToReadUseCase)
    .toHigherOrderFunction(updateAllNotificationByIdsToReadUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.INotificationRepository,
    ]);

  notificationModule
    .bind(DI_SYMBOLS.IUpdateAllNotificationByIdsToReadController)
    .toHigherOrderFunction(updateAllNotificationByIdsToReadController, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IUpdateAllNotificationByIdsToReadUseCase,
    ]);

  return notificationModule;
};
