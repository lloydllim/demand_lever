import { ICrashReporterService } from "@/lib/crash-reporter/application/services/crash-reporter.service.interface";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IPrismaService } from "@/lib/prisma/application/services/prisma.service.interface";
import { PrismaClient } from "@prisma/client";

export class PrismaService implements IPrismaService {
  private static prisma: PrismaClient | null = null;

  constructor(
    private readonly instrumentationService: IInstrumentationService,
    private readonly crashReporterService: ICrashReporterService
  ) {}

  private createClient(): PrismaClient {
    return new PrismaClient();
  }

  getClient(): PrismaClient {
    return this.instrumentationService.startSpan(
      { name: "PrismaService.getClient" },
      () => {
        try {
          if (!PrismaService.prisma) {
            PrismaService.prisma = this.createClient();
          }
          return PrismaService.prisma;
        } catch (error) {
          this.crashReporterService.report(error);
          throw error;
        }
      }
    );
  }
}
