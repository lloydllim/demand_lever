import {
  InputParseError,
  NotFound,
} from "@/lib/common/entities/controller.error";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IUserFindByIdAsClientUseCase } from "@/lib/user/application/use-cases/user-find-by-id-as-client.use-case";
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
  userId: z.string(),
});

export type IUserFindByIdAsClientController = ReturnType<
  typeof userFindByIdAsClientController
>;
export const userFindByIdAsClientController =
  (
    instrumentationService: IInstrumentationService,
    userFindByIdAsClientUseCase: IUserFindByIdAsClientUseCase
  ) =>
  async (input: z.infer<typeof inputData>) => {
    return await instrumentationService.startSpan(
      { name: "UserFindByIdAsClientController" },
      async () => {
        const { data, error: inputParseError } = inputData.safeParse(input);

        if (inputParseError) {
          console.error(inputParseError.errors);
          throw new InputParseError("Invalid input", {
            cause: inputParseError.errors.map((error) => error.message),
          });
        }

        const user = await userFindByIdAsClientUseCase(data.userId);

        if (!user) {
          throw new NotFound("User not found");
        }

        return presenter(instrumentationService, user);
      }
    );
  };
