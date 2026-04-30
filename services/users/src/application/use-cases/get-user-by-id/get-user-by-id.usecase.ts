import { User } from '../../../domain/entities/user';
import { UserGroups } from '../../../domain/enums/user-groups';
import { UserNotFoundError } from '../../../domain/errors/user-not-found';
import { UserRepository } from '../../../domain/repositories/user-repository';
import { UserId } from '../../../domain/value-objects/user-id';

export interface GetUserByIdOutput {
  id: string;
  email: string;
  name: string;
  phone: string;
  emailConfirmed: boolean;
  groups: UserGroups[];
}

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<GetUserByIdOutput> {
    const userId = UserId.fromString(id);

    const user: User | null = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError(userId.value);
    }

    return {
      id: user.id.value,
      email: user.email.value,
      name: user.name,
      phone: user.phone.value,
      emailConfirmed: user.emailConfirmed,
      groups: [...user.groups.value],
    };
  }
}
