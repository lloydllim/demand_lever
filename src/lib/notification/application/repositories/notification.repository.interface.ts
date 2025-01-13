import {
  INotificationModel,
  IPostNotificationModel,
} from "@/lib/notification/entities/notification.model";

export interface INotificationRepository {
  create(input: IPostNotificationModel): Promise<INotificationModel>;
  findAllByUserId(userId: string): Promise<INotificationModel[]>;
  updateAllByNotificationIdsToRead(notificationIds: string[]): Promise<number>;
}
