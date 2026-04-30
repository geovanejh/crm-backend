import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { EmailAlreadyRegisteredError } from '../../../domain/errors/email-already-registered';
import { InvalidCredentialsError } from '../../../domain/errors/invalid-credentials';
import { InvalidEmailError } from '../../../domain/errors/invalid-email';
import { InvalidGroupsError } from '../../../domain/errors/invalid-groups';
import { InvalidPhoneError } from '../../../domain/errors/invalid-phone';
import { InvalidTokenError } from '../../../domain/errors/invalid-token';
import { InvalidUserIdError } from '../../../domain/errors/invalid-user-id';
import { UserNotFoundError } from '../../../domain/errors/user-not-found';
import { WeakPasswordError } from '../../../domain/errors/weak-password';

@Catch(
  EmailAlreadyRegisteredError,
  InvalidCredentialsError,
  InvalidTokenError,
  UserNotFoundError,
  WeakPasswordError,
  InvalidEmailError,
  InvalidPhoneError,
  InvalidUserIdError,
  InvalidGroupsError,
)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const status = this.statusFor(error);

    response.status(status).json({
      statusCode: status,
      error: error.name,
      message: error.message,
    });
  }

  private statusFor(error: Error): number {
    if (error instanceof EmailAlreadyRegisteredError)
      return HttpStatus.CONFLICT;
    if (error instanceof InvalidCredentialsError)
      return HttpStatus.UNAUTHORIZED;
    if (error instanceof InvalidTokenError) return HttpStatus.UNAUTHORIZED;
    if (error instanceof UserNotFoundError) return HttpStatus.NOT_FOUND;
    return HttpStatus.BAD_REQUEST;
  }
}
