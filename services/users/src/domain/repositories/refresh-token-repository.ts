import { RefreshToken } from '../entities/refresh-token';
import { UserId } from '../value-objects/user-id';

export interface RefreshTokenRepository {
  findByTokenHash(tokenHash: string): Promise<RefreshToken | null>;
  save(token: RefreshToken): Promise<void>;
  revokeAllForUser(userId: UserId): Promise<void>;
}
