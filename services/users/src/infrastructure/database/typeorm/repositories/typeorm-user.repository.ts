import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../domain/entities/user';
import { UserRepository } from '../../../../domain/repositories/user-repository';
import { Email } from '../../../../domain/value-objects/email';
import { UserId } from '../../../../domain/value-objects/user-id';
import { UserOrmEntity } from '../entities/user.orm-entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class TypeormUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async findById(id: UserId): Promise<User | null> {
    const orm = await this.repository.findOne({ where: { id: id.value } });
    return orm ? UserMapper.toDomain(orm) : null;
  }

  async findByEmail(email: Email): Promise<User | null> {
    const orm = await this.repository.findOne({
      where: { email: email.value },
    });
    return orm ? UserMapper.toDomain(orm) : null;
  }

  async existsByEmail(email: Email): Promise<boolean> {
    const count = await this.repository.count({
      where: { email: email.value },
    });
    return count > 0;
  }

  async save(user: User): Promise<void> {
    await this.repository.save(UserMapper.toOrm(user));
  }

  async delete(id: UserId): Promise<void> {
    await this.repository.delete({ id: id.value });
  }
}
