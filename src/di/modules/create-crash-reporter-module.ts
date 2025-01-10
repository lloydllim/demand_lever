import { DI_SYMBOLS } from "@/di/types";
import { CrashReporterService } from "@/lib/crash-reporter/infrastructure/services/crash-reporter.service";
import { createModule } from "@evyweb/ioctopus";

export const createCrashReporterModule = () => {
  const crashReporterModule = createModule();

  crashReporterModule
    .bind(DI_SYMBOLS.ICrashReporterService)
    .toClass(CrashReporterService);

  return crashReporterModule;
};
