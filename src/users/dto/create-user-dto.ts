import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { UserRole } from '../enums/user-role.enum'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string

  @IsEmail()
  email!: string

  @IsEnum(UserRole, {
    message: 'Role must be one of OWNER, ADMIN, or SALESPERSON',
  })
  role!: UserRole
}
