import { DI_SYMBOLS } from "@/di/types";
import { InstrumentationService } from "@/lib/instrumentation/infrastructure/services/instrumentation.service";
import { createModule } from "@evyweb/ioctopus";

export const createInstrumentationModule = () => {
  const instrumentationModule = createModule();

  instrumentationModule
    .bind(DI_SYMBOLS.IInstrumentationService)
    .toClass(InstrumentationService);

  return instrumentationModule;
};
