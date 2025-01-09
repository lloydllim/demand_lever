import { ICrashReporterService } from "@/lib/shared/application/services/crash-reporter.service.interface";
import * as Sentry from "@sentry/nextjs";

export const CrashReporterService = class implements ICrashReporterService {
  report(error: unknown): string {
    return Sentry.captureException(error);
  }
};
