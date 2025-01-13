import { InputParseError } from "@/lib/common/entities/controller.error";
import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IUserRepository } from "@/lib/user/application/repositories/user.repository.interface";
import {
  IReadUserClientModel,
  ReadUserClientModel,
} from "@/lib/user/entities/user.model";

export type IFindUserByIdAsClientUseCase = ReturnType<
  typeof findUserByIdAsClientUseCase
>;

export const findUserByIdAsClientUseCase =
  (
    instrumentationService: IInstrumentationService,
    UserRepository: IUserRepository
  ) =>
  async (userId: string): Promise<IReadUserClientModel | null> => {
    return await instrumentationService.startSpan(
      { name: "UserFindByIdAsClientUseCase" },
      async () => {
        const user = await UserRepository.findByIdAsClient(userId);
        if (!user) {
          return null;
        }

        const { data, error: inputParseError } =
          ReadUserClientModel.safeParse(user);

        if (inputParseError) {
          throw new InputParseError("Invalid data.", {
            cause: inputParseError,
          });
        }

        return data;
      }
    );
  };
