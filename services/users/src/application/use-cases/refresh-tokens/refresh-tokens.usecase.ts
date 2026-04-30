import { randomUUID } from 'crypto';
import { RefreshToken } from '../../../domain/entities/refresh-token';
import { InvalidTokenError } from '../../../domain/errors/invalid-token';
import { RefreshTokenRepository } from '../../../domain/repositories/refresh-token-repository';
import { TokenIssuer } from '../../../domain/services/token-issuer';

export interface RefreshTokensInput {
  refreshToken: string;
}

export interface RefreshTokensOutput {
  accessToken: string;
  refreshToken: string;
}

export class RefreshTokensUseCase {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly tokenIssuer: TokenIssuer,
  ) {}

  async execute(input: RefreshTokensInput): Promise<RefreshTokensOutput> {
    const hashedToken = await this.tokenIssuer.hashRefreshToken(
      input.refreshToken,
    );
    const storedToken =
      await this.refreshTokenRepository.findByTokenHash(hashedToken);
    if (!storedToken || !storedToken.isUsable()) {
      throw new InvalidTokenError();
    }

    storedToken.revoke();
    await this.refreshTokenRepository.save(storedToken);

    const accessToken = await this.tokenIssuer.issueAccessToken({
      sub: storedToken.userId,
    });
    const newRefreshToken = await this.tokenIssuer.generateRefreshToken();
    const newHashedToken =
      await this.tokenIssuer.hashRefreshToken(newRefreshToken);

    const newRefreshEntity = RefreshToken.issue({
      id: randomUUID(),
      userId: storedToken.userId,
      tokenHash: newHashedToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await this.refreshTokenRepository.save(newRefreshEntity);

    return { accessToken, refreshToken: newRefreshToken };
  }
}
