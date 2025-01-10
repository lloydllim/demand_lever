import { IInstrumentationService } from "@/lib/instrumentation/application/services/instrumentation.service.interface";
import { IUserRepository } from "@/lib/user/application/repositories/user.repository.interface";
import { IReadUserClientModel } from "@/lib/user/entities/user.model";

export type IUserFindByIdAsClientUseCase = ReturnType<
  typeof userFindByIdAsClientUseCase
>;

export const userFindByIdAsClientUseCase =
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
        return user;
      }
    );
  };
