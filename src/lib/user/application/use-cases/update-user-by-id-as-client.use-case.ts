import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IUserRepository } from "@/lib/user/application/repositories/user.repository.interface";
import { IUpdateUserModel } from "@/lib/user/entities/user.model";

export type IUpdateUserByIdAsClientUseCase = ReturnType<
  typeof updateUserByIdAsClientUseCase
>;

export const updateUserByIdAsClientUseCase =
  (
    instrumentationService: IInstrumentationService,
    userRepository: IUserRepository
  ) =>
  (userId: string, input: Partial<IUpdateUserModel>) => {
    return instrumentationService.startSpan(
      { name: "updateUserByIdAsClientUseCase" },
      async () => {
        const user = await userRepository.updateClientByUserId(userId, input);
        return user;
      }
    );
  };
