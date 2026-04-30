import { UserGroups } from '../../../domain/enums/user-groups';
import { UserNotFoundError } from '../../../domain/errors/user-not-found';
import { UserRepository } from '../../../domain/repositories/user-repository';
import { UserId } from '../../../domain/value-objects/user-id';

export interface AssignGroupToUserOutput {
  success: boolean;
}

export class AssignGroupToUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    userId: string,
    group: UserGroups,
  ): Promise<AssignGroupToUserOutput> {
    const user = await this.userRepository.findById(UserId.fromString(userId));
    if (!user) {
      throw new UserNotFoundError(userId);
    }

    user.assignGroup(group);
    await this.userRepository.save(user);

    return { success: true };
  }
}
