import { IAuthService } from "@/lib/auth/application/services/auth.service.interface";
import {
  UnauthenticatedError,
  UnauthorizedError,
} from "@/lib/auth/entities/auth.error";
import { InputParseError } from "@/lib/common/entities/controller.error";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IFindUserByIdAsClientUseCase } from "@/lib/user/application/use-cases/find-user-by-id-as-client-use-case";
import { IReadUserClientModel } from "@/lib/user/entities/user.model";
import { z } from "zod";

const presenter = (
  instrumentationService: IInstrumentationService,
  user: IReadUserClientModel
) => {
  return instrumentationService.startSpan({ name: "presenter" }, async () => {
    return user;
  });
};

const inputData = z.object({
  token: z.string(),
});

export type IReadUserByIdAsClientController = ReturnType<
  typeof readUserByIdAsClientController
>;
export const readUserByIdAsClientController =
  (
    instrumentationService: IInstrumentationService,
    authService: IAuthService,
    findUserByIdAsClientUseCase: IFindUserByIdAsClientUseCase
  ) =>
  async (input: z.infer<typeof inputData>) => {
    return await instrumentationService.startSpan(
      { name: "readUserByIdAsClientController" },
      async () => {
        const { data, error: inputParseError } = inputData.safeParse(input);

        if (inputParseError) {
          throw new InputParseError("Invalid data.", {
            cause: inputParseError,
          });
        }

        const currentUser = authService.verifyToken(data.token);

        if (!currentUser) {
          throw new UnauthenticatedError("User not signed in.");
        }

        const user = await findUserByIdAsClientUseCase(currentUser.user_id);

        if (!user) {
          throw new UnauthorizedError("User not found.");
        }

        return presenter(instrumentationService, user);
      }
    );
  };
