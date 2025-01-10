import { IAuthVerifyTokenUseCase } from "@/lib/auth/application/use-cases/auth-verify-token.use-case";
import { InputParseError } from "@/lib/common/entities/controller.error";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { JwtPayload } from "jsonwebtoken";
import { z } from "zod";

export const presenter = (
  instrumentationService: IInstrumentationService,
  token: string | JwtPayload
) => {
  return instrumentationService.startSpan({ name: "presenter" }, () => {
    return token;
  });
};

const inputData = z.object({
  token: z.string(),
});

export type IPostAuthVerifyTokenController = ReturnType<
  typeof PostAuthVerifyTokenController
>;

export const PostAuthVerifyTokenController =
  (
    instrumentationService: IInstrumentationService,
    authVerifyTokenUseCase: IAuthVerifyTokenUseCase
  ) =>
  (input: z.infer<typeof inputData>) => {
    return instrumentationService.startSpan(
      { name: "PostAuthVerifyTokenController" },
      () => {
        const { data, error: inputParseError } = inputData.safeParse(input);

        if (inputParseError) {
          throw new InputParseError("Invalid input", {
            cause: inputParseError.errors,
          });
        }

        const result = authVerifyTokenUseCase(data.token);

        return presenter(instrumentationService, result);
      }
    );
  };
