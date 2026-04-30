import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHash, randomBytes } from 'crypto';
import { InvalidTokenError } from '../../domain/errors/invalid-token';
import {
  AccessTokenPayload,
  PurposeTokenPayload,
  TokenIssuer,
} from '../../domain/services/token-issuer';
import { UserId } from '../../domain/value-objects/user-id';

type JwtExpiresIn = number | `${number}${'s' | 'm' | 'h' | 'd' | 'w' | 'y'}`;

@Injectable()
export class JwtTokenIssuer implements TokenIssuer {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async issueAccessToken(payload: AccessTokenPayload): Promise<string> {
    return this.jwtService.signAsync(
      { sub: payload.sub.value },
      {
        secret: this.config.get<string>('JWT_SECRET'),
        expiresIn: this.config.get<string>(
          'JWT_ACCESS_EXPIRES_IN',
        ) as JwtExpiresIn,
      },
    );
  }

  async verifyAccessToken(token: string): Promise<AccessTokenPayload> {
    try {
      const decoded = await this.jwtService.verifyAsync<{ sub: string }>(
        token,
        { secret: this.config.get<string>('JWT_SECRET') },
      );
      return { sub: UserId.fromString(decoded.sub) };
    } catch {
      throw new InvalidTokenError();
    }
  }

  generateRefreshToken(): Promise<string> {
    return Promise.resolve(randomBytes(64).toString('hex'));
  }

  hashRefreshToken(token: string): Promise<string> {
    return Promise.resolve(createHash('sha256').update(token).digest('hex'));
  }

  async issuePurposeToken(payload: PurposeTokenPayload): Promise<string> {
    return this.jwtService.signAsync(
      { sub: payload.sub.value, purpose: payload.purpose },
      {
        secret: this.config.get<string>('JWT_SECRET'),
        expiresIn: this.config.get<string>(
          'JWT_PURPOSE_EXPIRES_IN',
        ) as JwtExpiresIn,
      },
    );
  }

  async verifyPurposeToken(
    token: string,
    expectedPurpose: string,
  ): Promise<PurposeTokenPayload> {
    try {
      const decoded = await this.jwtService.verifyAsync<{
        sub: string;
        purpose: string;
      }>(token, { secret: this.config.get<string>('JWT_SECRET') });
      if (decoded.purpose !== expectedPurpose) {
        throw new InvalidTokenError();
      }
      return {
        sub: UserId.fromString(decoded.sub),
        purpose: decoded.purpose,
      };
    } catch {
      throw new InvalidTokenError();
    }
  }
}
