import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { RefreshToken } from '../../../../domain/entities/refresh-token';
import { RefreshTokenRepository } from '../../../../domain/repositories/refresh-token-repository';
import { UserId } from '../../../../domain/value-objects/user-id';
import { RefreshTokenOrmEntity } from '../entities/refresh-token.orm-entity';
import { RefreshTokenMapper } from '../mappers/refresh-token.mapper';

@Injectable()
export class TypeormRefreshTokenRepository implements RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshTokenOrmEntity)
    private readonly repository: Repository<RefreshTokenOrmEntity>,
  ) {}

  async findByTokenHash(tokenHash: string): Promise<RefreshToken | null> {
    const orm = await this.repository.findOne({ where: { tokenHash } });
    return orm ? RefreshTokenMapper.toDomain(orm) : null;
  }

  async save(token: RefreshToken): Promise<void> {
    await this.repository.save(RefreshTokenMapper.toOrm(token));
  }

  async revokeAllForUser(userId: UserId): Promise<void> {
    await this.repository.update(
      { userId: userId.value, revokedAt: IsNull() },
      { revokedAt: new Date() },
    );
  }
}
