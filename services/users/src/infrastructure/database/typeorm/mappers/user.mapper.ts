import { User } from '../../../../domain/entities/user';
import { UserGroups } from '../../../../domain/enums/user-groups';
import { Email } from '../../../../domain/value-objects/email';
import { Groups } from '../../../../domain/value-objects/groups';
import { Password } from '../../../../domain/value-objects/password';
import { Phone } from '../../../../domain/value-objects/phone';
import { UserId } from '../../../../domain/value-objects/user-id';
import { UserOrmEntity } from '../entities/user.orm-entity';

export class UserMapper {
  static toDomain(orm: UserOrmEntity): User {
    return User.rehydrate({
      id: UserId.fromString(orm.id),
      name: orm.name,
      email: Email.rehydrate(orm.email),
      phone: Phone.rehydrate(orm.phone),
      password: Password.fromHash(orm.passwordHash),
      groups: Groups.fromArray(orm.groups as UserGroups[]),
      emailConfirmed: orm.emailConfirmed,
    });
  }

  static toOrm(user: User): UserOrmEntity {
    const orm = new UserOrmEntity();
    orm.id = user.id.value;
    orm.name = user.name;
    orm.email = user.email.value;
    orm.phone = user.phone.value;
    orm.passwordHash = user.password.value;
    orm.groups = user.groups.value;
    orm.emailConfirmed = user.emailConfirmed;
    return orm;
  }
}
