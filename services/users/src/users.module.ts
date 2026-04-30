import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticateUserUseCase } from './application/use-cases/authenticate-user/authenticate-user.usecase';
import { ConfirmEmailUseCase } from './application/use-cases/confirm-email/confirm-email.usecase';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id/get-user-by-id.usecase';
import { LogoutUseCase } from './application/use-cases/logout/logout.usecase';
import { RefreshTokensUseCase } from './application/use-cases/refresh-tokens/refresh-tokens.usecase';
import { RegisterUserUseCase } from './application/use-cases/register-user/register-user.usecase';
import { RefreshTokenRepository } from './domain/repositories/refresh-token-repository';
import { UserRepository } from './domain/repositories/user-repository';
import { PasswordHasher } from './domain/services/password-hasher';
import { TokenIssuer } from './domain/services/token-issuer';
import { JwtTokenIssuer } from './infrastructure/auth/jwt-token-issuer';
import { BcryptPasswordHasher } from './infrastructure/crypto/bcrypt-password-hasher';
import { RefreshTokenOrmEntity } from './infrastructure/database/typeorm/entities/refresh-token.orm-entity';
import { UserOrmEntity } from './infrastructure/database/typeorm/entities/user.orm-entity';
import { TypeormRefreshTokenRepository } from './infrastructure/database/typeorm/repositories/typeorm-refresh-token.repository';
import { TypeormUserRepository } from './infrastructure/database/typeorm/repositories/typeorm-user.repository';
import {
  PASSWORD_HASHER,
  REFRESH_TOKEN_REPOSITORY,
  TOKEN_ISSUER,
  USER_REPOSITORY,
} from './presentation/http/constants/injection-tokens';
import { AuthController } from './presentation/http/controllers/auth.controller';
import { UsersController } from './presentation/http/controllers/users.controller';
import { JwtStrategy } from './presentation/http/strategies/jwt.strategy';
import { AssignGroupToUserUseCase } from './application/use-cases/assign-group-to-user.usecase/assign-group-to-user.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity, RefreshTokenOrmEntity]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [AuthController, UsersController],
  providers: [
    { provide: USER_REPOSITORY, useClass: TypeormUserRepository },
    {
      provide: REFRESH_TOKEN_REPOSITORY,
      useClass: TypeormRefreshTokenRepository,
    },
    { provide: PASSWORD_HASHER, useClass: BcryptPasswordHasher },
    { provide: TOKEN_ISSUER, useClass: JwtTokenIssuer },

    {
      provide: RegisterUserUseCase,
      useFactory: (userRepo: UserRepository, hasher: PasswordHasher) =>
        new RegisterUserUseCase(userRepo, hasher),
      inject: [USER_REPOSITORY, PASSWORD_HASHER],
    },
    {
      provide: AuthenticateUserUseCase,
      useFactory: (
        userRepo: UserRepository,
        hasher: PasswordHasher,
        refreshRepo: RefreshTokenRepository,
        issuer: TokenIssuer,
      ) => new AuthenticateUserUseCase(userRepo, hasher, refreshRepo, issuer),
      inject: [
        USER_REPOSITORY,
        PASSWORD_HASHER,
        REFRESH_TOKEN_REPOSITORY,
        TOKEN_ISSUER,
      ],
    },
    {
      provide: RefreshTokensUseCase,
      useFactory: (refreshRepo: RefreshTokenRepository, issuer: TokenIssuer) =>
        new RefreshTokensUseCase(refreshRepo, issuer),
      inject: [REFRESH_TOKEN_REPOSITORY, TOKEN_ISSUER],
    },
    {
      provide: LogoutUseCase,
      useFactory: (refreshRepo: RefreshTokenRepository, issuer: TokenIssuer) =>
        new LogoutUseCase(refreshRepo, issuer),
      inject: [REFRESH_TOKEN_REPOSITORY, TOKEN_ISSUER],
    },
    {
      provide: ConfirmEmailUseCase,
      useFactory: (userRepo: UserRepository, issuer: TokenIssuer) =>
        new ConfirmEmailUseCase(userRepo, issuer),
      inject: [USER_REPOSITORY, TOKEN_ISSUER],
    },
    {
      provide: GetUserByIdUseCase,
      useFactory: (userRepo: UserRepository) =>
        new GetUserByIdUseCase(userRepo),
      inject: [USER_REPOSITORY],
    },
    {
      provide: AssignGroupToUserUseCase,
      useFactory: (userRepo: UserRepository) =>
        new AssignGroupToUserUseCase(userRepo),
      inject: [USER_REPOSITORY],
    },

    JwtStrategy,
  ],
})
export class UsersModule {}
