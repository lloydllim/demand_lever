import { DI_SYMBOLS } from "@/di/types";
import { PrismaService } from "@/lib/prisma/infrastructure/services/prisma.service";
import { createModule } from "@evyweb/ioctopus";

export const createPrismaModule = () => {
  const prismaModule = createModule();

  prismaModule
    .bind(DI_SYMBOLS.IPrismaService)
    .toClass(PrismaService, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.ICrashReporterService,
    ]);

  return prismaModule;
};
