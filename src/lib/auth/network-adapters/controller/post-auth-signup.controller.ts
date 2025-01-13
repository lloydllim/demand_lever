import { IAuthSignupUseCase } from "@/lib/auth/application/use-cases/auth-signup.use-case";
import { InputParseError } from "@/lib/common/entities/controller.error";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { PostUserModel } from "@/lib/user/entities/user.model";
import { z } from "zod";

const presenter = (
  instrumentationService: IInstrumentationService,
  token: string
) => {
  return instrumentationService.startSpan({ name: "presenter" }, () => {
    return {
      token,
    };
  });
};

const inputData = PostUserModel;

export type IPostAuthSignupController = ReturnType<
  typeof PostAuthSignupController
>;

export const PostAuthSignupController =
  (
    instrumentationService: IInstrumentationService,
    authSignupUseCase: IAuthSignupUseCase
  ) =>
  (input: z.infer<typeof inputData>) => {
    return instrumentationService.startSpan(
      { name: "PostAuthSignupController" },
      async () => {
        const { data, error: inputParseError } = inputData.safeParse(input);

        if (inputParseError) {
          throw new InputParseError("Invalid data.", {
            cause: inputParseError.errors,
          });
        }

        const token = await authSignupUseCase(data);
        return presenter(instrumentationService, token);
      }
    );
  };
