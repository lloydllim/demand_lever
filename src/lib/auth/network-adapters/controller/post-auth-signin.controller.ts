import { IAuthSigninUseCase } from "@/lib/auth/application/use-cases/auth-signin.use-case";
import { UnauthenticatedError } from "@/lib/auth/entities/auth.error";
import { InputParseError } from "@/lib/common/entities/controller.error";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
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

const inputData = z.object({
  email: z.string(),
  password: z.string(),
});

export type IPostAuthSigninController = ReturnType<
  typeof PostAuthSigninController
>;

export const PostAuthSigninController =
  (
    instrumentationService: IInstrumentationService,
    authSigninUseCase: IAuthSigninUseCase
  ) =>
  (input: z.infer<typeof inputData>) => {
    return instrumentationService.startSpan(
      { name: "PostAuthSigninController" },
      async () => {
        const { data, error: inputParseError } = inputData.safeParse(input);

        if (inputParseError) {
          throw new InputParseError("Invalid input", {
            cause: inputParseError.errors,
          });
        }

        const token = await authSigninUseCase(data.email, data.password);

        if (!token) {
          throw new UnauthenticatedError("Invalid email or password");
        }

        return presenter(instrumentationService, token);
      }
    );
  };
