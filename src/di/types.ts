import { IAuthService } from "@/lib/auth/application/services/auth.service.interface";
import { IAuthSigninUseCase } from "@/lib/auth/application/use-cases/auth-signin.use-case";
import { IAuthSignupUseCase } from "@/lib/auth/application/use-cases/auth-signup.use-case";
import { IAuthVerifyTokenUseCase } from "@/lib/auth/application/use-cases/auth-verify-token.use-case";
import { IPostAuthSigninController } from "@/lib/auth/network-adapters/controller/post-auth-signin.controller";
import { IPostAuthSignupController } from "@/lib/auth/network-adapters/controller/post-auth-signup.controller";
import { IPostAuthVerifyTokenController } from "@/lib/auth/network-adapters/controller/post-auth-verify-token.controller";
import { ICrashReporterService } from "@/lib/crash-reporter/application/services/crash-reporter.service.interface";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { INotificationRepository } from "@/lib/notification/application/repositories/notification.repository.interface";
import { ICreateNotificationUseCase } from "@/lib/notification/application/use-cases/create-notification.use-case";
import { IFindAllNotificationByUserIdUseCase } from "@/lib/notification/application/use-cases/find-all-notification-by-user-id.use-case";
import { IUpdateAllNotificationByIdsToReadUseCase } from "@/lib/notification/application/use-cases/update-all-notification-by-ids-to-read.use-case";
import { IReadAllNotificationByUserIdController } from "@/lib/notification/network-adapters/controllers/read-all-notification-by-user-id.controller";
import { IUpdateAllNotificationByIdsToReadController } from "@/lib/notification/network-adapters/controllers/update-all-notification-by-ids-to-read.controller";
import { IPrismaService } from "@/lib/prisma/application/services/prisma.service.interface";
import { IStripeService } from "@/lib/stripe/application/services/stripe.service.interface";
import { IStripeCheckSessionIdAndUpdateUseCase } from "@/lib/stripe/application/use-case/stripe-check-session-id-and-update.use-case";
import { IStripeCreateCheckoutSessionIdAsClientUseCase } from "@/lib/stripe/application/use-case/stripe-create-checkout-session-id-as-client.use-case";
import { IStripeProcessWebhookUseCase } from "@/lib/stripe/application/use-case/stripe-process-webhook.use-case";
import { IPostStripeCheckSessionIdAndUpdateController } from "@/lib/stripe/interface-adapters/controllers/post-stripe-check-session-id-and-update.controller";
import { IPostStripeCreateCheckoutSessionIdAsClientController } from "@/lib/stripe/interface-adapters/controllers/post-stripe-create-checkout-session-id-as-client.controller";
import { IPostStripeProcessWebhookController } from "@/lib/stripe/interface-adapters/controllers/post-stripe-process-webhook.controller";
import { IUserRepository } from "@/lib/user/application/repositories/user.repository.interface";
import { IFindUserByIdAsClientUseCase } from "@/lib/user/application/use-cases/find-user-by-id-as-client-use-case";
import { IUpdateUserByIdAsClientUseCase } from "@/lib/user/application/use-cases/update-user-by-id-as-client.use-case";
import { IReadUserByIdAsClientController } from "@/lib/user/network-adapters/controllers/read-user-by-id-as-client.controller";
import { IUpdateUserByIdAsClientController } from "@/lib/user/network-adapters/controllers/update-user-by-id-as-client.controller";

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

  IAuthSignupUseCase: IAuthSignupUseCase;
  IPostAuthSignupController: IPostAuthSignupController;

  IAuthSigninUseCase: IAuthSigninUseCase;
  IPostAuthSigninController: IPostAuthSigninController;

  // user
  IUserRepository: IUserRepository;

  IFindUserByIdAsClientUseCase: IFindUserByIdAsClientUseCase;
  IReadUserByIdAsClientController: IReadUserByIdAsClientController;

  IUpdateUserByIdAsClientUseCase: IUpdateUserByIdAsClientUseCase;
  IUpdateUserByIdAsClientController: IUpdateUserByIdAsClientController;

  // stripe
  IStripeService: IStripeService;

  IStripeCreateCheckoutSessionIdAsClientUseCase: IStripeCreateCheckoutSessionIdAsClientUseCase;
  IPostStripeCreateCheckoutSessionIdAsClientController: IPostStripeCreateCheckoutSessionIdAsClientController;

  IStripeProcessWebhookUseCase: IStripeProcessWebhookUseCase;
  IPostStripeProcessWebhookController: IPostStripeProcessWebhookController;

  IStripeCheckSessionIdAndUpdateUseCase: IStripeCheckSessionIdAndUpdateUseCase;
  IPostStripeCheckSessionIdAndUpdateController: IPostStripeCheckSessionIdAndUpdateController;

  // notification
  INotificationRepository: INotificationRepository;

  ICreateNotificationUseCase: ICreateNotificationUseCase;

  IFindAllNotificationByUserIdUseCase: IFindAllNotificationByUserIdUseCase;
  IReadAllNotificationByUserIdController: IReadAllNotificationByUserIdController;

  IUpdateAllNotificationByIdsToReadUseCase: IUpdateAllNotificationByIdsToReadUseCase;
  IUpdateAllNotificationByIdsToReadController: IUpdateAllNotificationByIdsToReadController;
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

  IAuthSignupUseCase: Symbol.for("IAuthSignupUseCase"),
  IPostAuthSignupController: Symbol.for("IPostAuthSignupController"),

  IAuthSigninUseCase: Symbol.for("IAuthSigninUseCase"),
  IPostAuthSigninController: Symbol.for("IPostAuthSigninController"),

  // user
  IUserRepository: Symbol.for("IUserRepository"),

  IFindUserByIdAsClientUseCase: Symbol.for("IFindUserByIdAsClientUseCase"),
  IReadUserByIdAsClientController: Symbol.for(
    "IReadUserByIdAsClientController"
  ),

  IUpdateUserByIdAsClientUseCase: Symbol.for("IUpdateUserByIdAsClientUseCase"),
  IUpdateUserByIdAsClientController: Symbol.for(
    "IUpdateUserByIdAsClientController"
  ),

  // stripe
  IStripeService: Symbol.for("IStripeService"),

  IStripeCreateCheckoutSessionIdAsClientUseCase: Symbol.for(
    "IStripeCreateCheckoutSessionIdAsClientUseCase"
  ),
  IPostStripeCreateCheckoutSessionIdAsClientController: Symbol.for(
    "IPostStripeCreateCheckoutSessionIdAsClientController"
  ),

  IStripeProcessWebhookUseCase: Symbol.for("IStripeProcessWebhookUseCase"),
  IPostStripeProcessWebhookController: Symbol.for(
    "IPostStripeProcessWebhookController"
  ),

  IStripeCheckSessionIdAndUpdateUseCase: Symbol.for(
    "IStripeCheckSessionIdAndUpdateUseCase"
  ),
  IPostStripeCheckSessionIdAndUpdateController: Symbol.for(
    "IPostStripeCheckSessionIdAndUpdateController"
  ),

  // notification
  INotificationRepository: Symbol.for("INotificationRepository"),
  ICreateNotificationUseCase: Symbol.for("ICreateNotificationUseCase"),
  IFindAllNotificationByUserIdUseCase: Symbol.for(
    "IFindAllNotificationByUserIdUseCase"
  ),
  IReadAllNotificationByUserIdController: Symbol.for(
    "IReadAllNotificationByUserIdController"
  ),
  IUpdateAllNotificationByIdsToReadUseCase: Symbol.for(
    "IUpdateAllNotificationByIdsToReadUseCase"
  ),
  IUpdateAllNotificationByIdsToReadController: Symbol.for(
    "IUpdateAllNotificationByIdsToReadController"
  ),
};
