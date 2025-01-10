import { IAuthService } from "@/lib/auth/application/services/auth.service.interface";
import { IAuthVerifyTokenUseCase } from "@/lib/auth/application/use-cases/auth-verify-token.use-case";
import { IPostAuthVerifyTokenController } from "@/lib/auth/network-adapters/controller/post-auth-verify-token.controller";
import { ICrashReporterService } from "@/lib/crash-reporter/application/services/crash-reporter.service.interface";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IPrismaService } from "@/lib/prisma/application/services/prisma.service.interface";

export interface DI_RETURN_TYPES {
  // instrumentation
  IInstrumentationService: IInstrumentationService;

  // crash-reporter
  ICrashReporterService: ICrashReporterService;

  // prisma
  IPrismaService: IPrismaService;

  // auth
  IAuthService: IAuthService;
  IAuthVerifyTokenUseCase: IAuthVerifyTokenUseCase;
  IPostAuthVerifyTokenController: IPostAuthVerifyTokenController;
}

export const DI_SYMBOLS = {
  // instrumentation
  IInstrumentationService: Symbol.for("IInstrumentationService"),

  // crash-reporter
  ICrashReporterService: Symbol.for("ICrashReporterService"),

  // prisma
  IPrismaService: Symbol.for("IPrismaService"),

  // auth
  IAuthService: Symbol.for("IAuthService"),
  IAuthVerifyTokenUseCase: Symbol.for("IAuthVerifyTokenUseCase"),
  IPostAuthVerifyTokenController: Symbol.for("IPostAuthVerifyTokenController"),
};
