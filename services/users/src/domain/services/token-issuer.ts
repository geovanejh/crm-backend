import { UserId } from '../value-objects/user-id';

export interface AccessTokenPayload {
  sub: UserId;
}

export interface TokenIssuer {
  issueAccessToken(payload: AccessTokenPayload): Promise<string>;
  verifyAccessToken(token: string): Promise<AccessTokenPayload>;

  generateRefreshToken(): Promise<string>;
  hashRefreshToken(token: string): Promise<string>;

  issuePurposeToken(payload: PurposeTokenPayload): Promise<string>;
  verifyPurposeToken(
    token: string,
    expectedPurpose: string,
  ): Promise<PurposeTokenPayload>;
}

export interface PurposeTokenPayload {
  sub: UserId;
  purpose: string;
}
