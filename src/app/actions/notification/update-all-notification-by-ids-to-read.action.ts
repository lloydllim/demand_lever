"use server";

import { getInjection } from "@/di/container";
import { InputParseError } from "@/lib/common/entities/controller.error";

export const updateAllNotificationByIdsToReadAction = async (
  notificationIds: string[]
) => {
  const instrumentationService = getInjection("IInstrumentationService");
  return instrumentationService.instrumentServerAction(
    "updateAllNotificationByIdsToReadAction",
    { recordResponse: true },
    async () => {
      try {
        const updateAllNotificationByIdsToReadController = getInjection(
          "IUpdateAllNotificationByIdsToReadController"
        );
        const response = await updateAllNotificationByIdsToReadController({
          notificationIds,
        });

        return {
          result: response.notificationsUpdatedCount,
        };
      } catch (error) {
        if (error instanceof InputParseError) {
          return {
            error: "Invalid data.",
          };
        }

        const crashReporterService = getInjection("ICrashReporterService");
        crashReporterService.report(error);
        return {
          error:
            "An error occurred while updating notifications. The team has been notified. Please try again later.",
        };
      }
    }
  );
};
