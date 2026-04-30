import { UserNotFoundError } from '../../../domain/errors/user-not-found';
import { UserRepository } from '../../../domain/repositories/user-repository';
import { TokenIssuer } from '../../../domain/services/token-issuer';

export interface ConfirmEmailInput {
  token: string;
}

export interface ConfirmEmailOutput {
  success: boolean;
}

const EMAIL_CONFIRMATION_PURPOSE = 'email-confirmation';

export class ConfirmEmailUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenIssuer: TokenIssuer,
  ) {}

  async execute(input: ConfirmEmailInput): Promise<ConfirmEmailOutput> {
    const payload = await this.tokenIssuer.verifyPurposeToken(
      input.token,
      EMAIL_CONFIRMATION_PURPOSE,
    );

    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      throw new UserNotFoundError(payload.sub.value);
    }

    user.confirmEmail();
    await this.userRepository.save(user);

    return { success: true };
  }
}
