import { UserGroups } from '../enums/user-groups';
import { Email } from '../value-objects/email';
import { Groups } from '../value-objects/groups';
import { Password } from '../value-objects/password';
import { Phone } from '../value-objects/phone';
import { UserId } from '../value-objects/user-id';

export interface UserSnapshot {
  id: UserId;
  name: string;
  phone: Phone;
  email: Email;
  password: Password;
  groups: Groups;
  emailConfirmed: boolean;
}

export class User {
  constructor(
    private readonly _id: UserId,
    private _name: string,
    private _phone: Phone,
    private _email: Email,
    private _password: Password,
    private _emailConfirmed: boolean = false,
    private _groups: Groups,
  ) {}

  static create(
    id: UserId,
    name: string,
    phone: Phone,
    email: Email,
    password: Password,
    emailConfirmed: boolean,
    groups: Groups,
  ): User {
    return new User(id, name, phone, email, password, emailConfirmed, groups);
  }

  static rehydrate(snapshot: UserSnapshot): User {
    return new User(
      snapshot.id,
      snapshot.name,
      snapshot.phone,
      snapshot.email,
      snapshot.password,
      snapshot.emailConfirmed,
      snapshot.groups,
    );
  }

  confirmEmail(): void {
    if (this._emailConfirmed) return;
    this._emailConfirmed = true;
  }

  changePassword(newPassword: Password): void {
    this._password = newPassword;
  }

  assignGroup(group: UserGroups): void {
    this._groups = this._groups.add(group);
  }

  removeGroup(group: UserGroups): void {
    this._groups = this._groups.remove(group);
  }

  get id(): UserId {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get phone(): Phone {
    return this._phone;
  }

  get email(): Email {
    return this._email;
  }

  get password(): Password {
    return this._password;
  }

  get emailConfirmed(): boolean {
    return this._emailConfirmed;
  }

  get groups(): Groups {
    return this._groups;
  }
}
