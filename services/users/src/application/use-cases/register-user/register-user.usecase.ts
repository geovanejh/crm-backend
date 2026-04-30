import { User } from '../../../domain/entities/user';
import { UserGroups } from '../../../domain/enums/user-groups';
import { EmailAlreadyRegisteredError } from '../../../domain/errors/email-already-registered';
import { UserRepository } from '../../../domain/repositories/user-repository';
import { PasswordHasher } from '../../../domain/services/password-hasher';
import { Email } from '../../../domain/value-objects/email';
import { Groups } from '../../../domain/value-objects/groups';
import { Password } from '../../../domain/value-objects/password';
import { Phone } from '../../../domain/value-objects/phone';
import { UserId } from '../../../domain/value-objects/user-id';

export interface RegisterUserInput {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface RegisterUserOutput {
  id: string;
  email: string;
  name: string;
}

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    const phone = Phone.create(input.phone);
    const email = Email.create(input.email);
    Password.validateStrength(input.password);

    const userExists = await this.userRepository.existsByEmail(email);
    if (userExists) {
      throw new EmailAlreadyRegisteredError(email.value);
    }

    const hashedPassword = await this.passwordHasher.hash(input.password);
    const password = Password.fromHash(hashedPassword);
    const id = UserId.generate();
    const groups = Groups.fromArray([UserGroups.User]);

    const user = User.create(
      id,
      input.name,
      phone,
      email,
      password,
      false,
      groups,
    );

    await this.userRepository.save(user);
    return { id: user.id.value, email: user.email.value, name: user.name };
  }
}
