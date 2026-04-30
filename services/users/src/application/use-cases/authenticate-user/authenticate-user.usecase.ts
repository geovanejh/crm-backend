import { randomUUID } from 'crypto';
import { RefreshToken } from '../../../domain/entities/refresh-token';
import { InvalidCredentialsError } from '../../../domain/errors/invalid-credentials';
import { RefreshTokenRepository } from '../../../domain/repositories/refresh-token-repository';
import { UserRepository } from '../../../domain/repositories/user-repository';
import { PasswordHasher } from '../../../domain/services/password-hasher';
import { TokenIssuer } from '../../../domain/services/token-issuer';
import { Email } from '../../../domain/value-objects/email';

export interface AuthenticateUserInput {
  email: string;
  password: string;
}

export interface AuthenticateUserOutput {
  accessToken: string;
  refreshToken: string;
}

export class AuthenticateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly tokenIssuer: TokenIssuer,
  ) {}

  async execute(input: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    const email = Email.create(input.email);

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const valid = await this.passwordHasher.compare(
      input.password,
      user.password.value,
    );
    if (!valid) {
      throw new InvalidCredentialsError();
    }

    const accessToken = await this.tokenIssuer.issueAccessToken({
      sub: user.id,
    });
    const refreshTokenPlain = await this.tokenIssuer.generateRefreshToken();
    const refreshHash =
      await this.tokenIssuer.hashRefreshToken(refreshTokenPlain);

    const refreshEntity = RefreshToken.issue({
      id: randomUUID(),
      userId: user.id,
      tokenHash: refreshHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await this.refreshTokenRepository.save(refreshEntity);

    return { accessToken, refreshToken: refreshTokenPlain };
  }
}
