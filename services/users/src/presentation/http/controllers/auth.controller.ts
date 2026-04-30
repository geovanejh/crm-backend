import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticateUserUseCase } from '../../../application/use-cases/authenticate-user/authenticate-user.usecase';
import { ConfirmEmailUseCase } from '../../../application/use-cases/confirm-email/confirm-email.usecase';
import { LogoutUseCase } from '../../../application/use-cases/logout/logout.usecase';
import { RefreshTokensUseCase } from '../../../application/use-cases/refresh-tokens/refresh-tokens.usecase';
import { RegisterUserUseCase } from '../../../application/use-cases/register-user/register-user.usecase';
import { ConfirmEmailDto } from '../dtos/confirm-email.dto';
import { LoginDto } from '../dtos/login.dto';
import { LogoutDto } from '../dtos/logout.dto';
import { RefreshTokensDto } from '../dtos/refresh-tokens.dto';
import { RegisterUserDto } from '../dtos/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly authenticateUser: AuthenticateUserUseCase,
    private readonly refreshTokens: RefreshTokensUseCase,
    private readonly logout: LogoutUseCase,
    private readonly confirmEmail: ConfirmEmailUseCase,
  ) {}

  @Post('register')
  register(@Body() dto: RegisterUserDto) {
    return this.registerUser.execute(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authenticateUser.execute(dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() dto: RefreshTokensDto) {
    return this.refreshTokens.execute(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logoutEndpoint(@Body() dto: LogoutDto) {
    return this.logout.execute(dto);
  }

  @Post('confirm-email')
  @HttpCode(HttpStatus.OK)
  confirmEmailEndpoint(@Body() dto: ConfirmEmailDto) {
    return this.confirmEmail.execute(dto);
  }
}
