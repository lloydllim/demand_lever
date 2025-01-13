import { IAuthService } from "@/lib/auth/application/services/auth.service.interface";
import { InputParseError } from "@/lib/common/entities/controller.error";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IUpdateUserByIdAsClientUseCase } from "@/lib/user/application/use-cases/update-user-by-id-as-client.use-case";
import {
  IReadUserClientModel,
  ReadUserClientModel,
  UpdateUserClient,
} from "@/lib/user/entities/user.model";
import { User } from "@prisma/client";
import { z } from "zod";

const presenter = (
  instrumentationService: IInstrumentationService,
  user: User
): IReadUserClientModel => {
  return instrumentationService.startSpan({ name: "presenter" }, () =>
    ReadUserClientModel.parse(user)
  );
};

const inputData = z.object({
  user: UpdateUserClient,
  token: z.string(),
});

export type IUpdateUserByIdAsClientController = ReturnType<
  typeof updateUserByIdAsClientController
>;

export const updateUserByIdAsClientController =
  (
    instrumentationService: IInstrumentationService,
    authService: IAuthService,
    updateUserByIdAsClientUseCase: IUpdateUserByIdAsClientUseCase
  ) =>
  (input: z.infer<typeof inputData>) => {
    return instrumentationService.startSpan(
      { name: "updateUserByIdAsClient" },
      async () => {
        const { data, error: inputParseError } = inputData.safeParse(input);
        if (inputParseError) {
          throw new InputParseError("Invalid data", {
            cause: inputParseError,
          });
        }
        const currentUser = authService.verifyToken(data.token);
        const updatedUser = await updateUserByIdAsClientUseCase(
          currentUser.user_id,
          {
            ...data.user,
            hasCompletedOnboarding: true,
          }
        );
        return presenter(instrumentationService, updatedUser);
      }
    );
  };
