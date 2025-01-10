import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import * as Sentry from "@sentry/nextjs";

export const InstrumentationService = class implements IInstrumentationService {
  startSpan<T>(
    options: { name: string; op?: string; attributes?: Record<string, never> },
    callback: () => T
  ): T {
    return Sentry.startSpan(options, callback);
  }

  instrumentServerAction<T>(
    name: string,
    options: Record<string, never>,
    callback: () => T
  ): Promise<T> {
    return Sentry.withServerActionInstrumentation(name, options, callback);
  }
};
