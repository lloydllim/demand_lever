import env from "@/env";
import { ICrashReporterService } from "@/lib/shared/application/services/crash-reporter.service.interface";
import * as Sentry from "@sentry/nextjs";

export const CrashReporterService = class implements ICrashReporterService {
  report(error: unknown): string {
    if (env.NODE_ENV === "development") {
      throw error;
    }

    return Sentry.captureException(error);
  }
};
