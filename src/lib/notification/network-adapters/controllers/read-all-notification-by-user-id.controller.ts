import { IAuthService } from "@/lib/auth/application/services/auth.service.interface";
import { UnauthenticatedError } from "@/lib/auth/entities/auth.error";
import { InputParseError } from "@/lib/common/entities/controller.error";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IFindAllNotificationByUserIdUseCase } from "@/lib/notification/application/use-cases/find-all-notification-by-user-id.use-case";
import { INotificationModel } from "@/lib/notification/entities/notification.model";
import { z } from "zod";

const presenter = (
  instrumentationService: IInstrumentationService,
  notifications: INotificationModel[]
) => {
  return instrumentationService.startSpan({ name: "presenter" }, () => {
    return notifications.map((notification) => {
      return {
        message: notification.message,
        createdAt: notification.createdAt,
        read: notification.read,
        id: notification.id,
      };
    });
  });
};

const inputData = z.object({
  token: z.string(),
});

export type IReadAllNotificationByUserIdController = ReturnType<
  typeof readAllNotificationByUserIdController
>;

export const readAllNotificationByUserIdController =
  (
    instrumentationService: IInstrumentationService,
    authService: IAuthService,
    findAllNotificationByUserIdUseCase: IFindAllNotificationByUserIdUseCase
  ) =>
  async (input: z.infer<typeof inputData>) => {
    return instrumentationService.startSpan(
      { name: "ReadAllNotificationByUserIdController" },
      async () => {
        const { data, error: inputParseError } = inputData.safeParse(input);

        if (inputParseError) {
          throw new InputParseError("Invalid input", {
            cause: inputParseError,
          });
        }

        const currentUser = authService.verifyToken(data.token);

        if (!currentUser) {
          throw new UnauthenticatedError("User not signed in.");
        }

        const notifications = await findAllNotificationByUserIdUseCase(
          currentUser.user_id
        );

        return presenter(instrumentationService, notifications);
      }
    );
  };
