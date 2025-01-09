import { createCrashReporterModule } from "@/di/modules/create-crash-reporter-module";
import { createInstrumentationModule } from "@/di/modules/create-instrumentation-module";
import { createPrismaModule } from "@/di/modules/create-prisma-module";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "@/di/types";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { createContainer } from "@evyweb/ioctopus";

type DIKeys = keyof typeof DI_SYMBOLS;

type SymbolToReturnType<K extends DIKeys> = K extends keyof DI_RETURN_TYPES
  ? DI_RETURN_TYPES[K]
  : never;

const ApplicationContainer = createContainer();

// instrumentation
ApplicationContainer.load(
  Symbol("InstrumentationModule"),
  createInstrumentationModule()
);

// crash-reporter
ApplicationContainer.load(
  Symbol("CrashReporterModule"),
  createCrashReporterModule()
);

// prisma
ApplicationContainer.load(Symbol("PrismaModule"), createPrismaModule());

export function getInjection<K extends DIKeys>(
  symbol: K
): SymbolToReturnType<K> {
  const instrumentationService =
    ApplicationContainer.get<IInstrumentationService>(
      DI_SYMBOLS.IInstrumentationService
    );

  if (!instrumentationService) {
    throw new Error("IInstrumentationService is not resolved correctly.");
  }

  return instrumentationService.startSpan(
    {
      name: "(di) getInjection",
      op: "function",
      attributes: { symbol: symbol.toString() },
    },
    () => {
      const resolvedDependency = ApplicationContainer.get(
        DI_SYMBOLS[symbol]
      ) as SymbolToReturnType<K>;

      if (!resolvedDependency) {
        throw new Error(
          `Dependency for symbol ${symbol.toString()} is not registered.`
        );
      }
      return resolvedDependency;
    }
  );
}
