import { RefreshTokenRepository } from '../../../domain/repositories/refresh-token-repository';
import { TokenIssuer } from '../../../domain/services/token-issuer';

export interface LogoutInput {
  refreshToken: string;
}

export interface LogoutOutput {
  success: boolean;
}

export class LogoutUseCase {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly tokenIssuer: TokenIssuer,
  ) {}

  async execute(input: LogoutInput): Promise<LogoutOutput> {
    const hashedToken = await this.tokenIssuer.hashRefreshToken(
      input.refreshToken,
    );
    const stored =
      await this.refreshTokenRepository.findByTokenHash(hashedToken);
    if (!stored) {
      return { success: false };
    }

    stored.revoke();
    await this.refreshTokenRepository.save(stored);
    return { success: true };
  }
}
