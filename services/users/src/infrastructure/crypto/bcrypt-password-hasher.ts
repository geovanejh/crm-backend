import { Injectable } from '@nestjs/common';
import { PasswordHasher } from '../../domain/services/password-hasher';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptPasswordHasher implements PasswordHasher {
  constructor(private readonly config: ConfigService) {}

  async hash(plainText: string): Promise<string> {
    // 1. ler BCRYPT_ROUNDS do config (Number(...) — vem como string)
    // 2. retornar bcrypt.hash(plainText, rounds)
    const rounds = Number(this.config.get<string>('BCRYPT_ROUNDS') || '10');
    return bcrypt.hash(plainText, rounds);
  }

  async compare(plainText: string, hash: string): Promise<boolean> {
    // bcrypt.compare(plainText, hash)
    return bcrypt.compare(plainText, hash);
  }
}
