import { UserId } from '../value-objects/user-id';

export interface RefreshTokenSnapshot {
  id: string;
  userId: UserId;
  tokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
  createdAt: Date;
}

export class RefreshToken {
  private constructor(
    private readonly _id: string,
    private readonly _userId: UserId,
    private readonly _tokenHash: string,
    private readonly _expiresAt: Date,
    private _revokedAt: Date | null,
    private readonly _createdAt: Date,
  ) {}

  static issue(params: {
    id: string;
    userId: UserId;
    tokenHash: string;
    expiresAt: Date;
  }): RefreshToken {
    return new RefreshToken(
      params.id,
      params.userId,
      params.tokenHash,
      params.expiresAt,
      null,
      new Date(),
    );
  }

  static rehydrate(snapshot: RefreshTokenSnapshot): RefreshToken {
    return new RefreshToken(
      snapshot.id,
      snapshot.userId,
      snapshot.tokenHash,
      snapshot.expiresAt,
      snapshot.revokedAt,
      snapshot.createdAt,
    );
  }

  isExpired(now: Date = new Date()): boolean {
    return now >= this._expiresAt;
  }

  isRevoked(): boolean {
    return this._revokedAt !== null;
  }

  isUsable(now: Date = new Date()): boolean {
    return !this.isExpired(now) && !this.isRevoked();
  }

  revoke(now: Date = new Date()): void {
    if (this._revokedAt !== null) return;
    this._revokedAt = now;
  }

  get id(): string {
    return this._id;
  }
  get userId(): UserId {
    return this._userId;
  }
  get tokenHash(): string {
    return this._tokenHash;
  }
  get expiresAt(): Date {
    return this._expiresAt;
  }
  get revokedAt(): Date | null {
    return this._revokedAt;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
}
