import { InputParseError } from "@/lib/common/entities/controller.error";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IUpdateAllNotificationByIdsToReadUseCase } from "@/lib/notification/application/use-cases/update-all-notification-by-ids-to-read.use-case";
import { z } from "zod";

const presenter = (
  instrumentationService: IInstrumentationService,
  notificationsUpdatedCount: number
) => {
  return instrumentationService.startSpan({ name: "presenter" }, () => {
    return {
      notificationsUpdatedCount,
    };
  });
};

export type IUpdateAllNotificationByIdsToReadController = ReturnType<
  typeof updateAllNotificationByIdsToReadController
>;

const inputData = z.object({
  notificationIds: z.array(z.string()),
});

export const updateAllNotificationByIdsToReadController =
  (
    instrumentationService: IInstrumentationService,
    updateAllNotificationByIdsToReadUseCase: IUpdateAllNotificationByIdsToReadUseCase
  ) =>
  async (input: z.infer<typeof inputData>) => {
    return instrumentationService.startSpan(
      { name: "UpdateAllNotificationByIdsToReadController" },
      async () => {
        const { data, error: inputParseError } = inputData.safeParse(input);

        if (inputParseError) {
          throw new InputParseError("Invalid input", {
            cause: inputParseError,
          });
        }

        const notificationsUpdatedCount =
          await updateAllNotificationByIdsToReadUseCase(data.notificationIds);

        return presenter(instrumentationService, notificationsUpdatedCount);
      }
    );
  };
