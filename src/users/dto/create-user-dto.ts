import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string

  @IsEmail()
  email!: string

  @IsEnum(['OWNER', 'ADMIN', 'SALESPERSON'], {
    message: 'Role must be one of OWNER, ADMIN, or SALESPERSON',
  })
  role!: 'OWNER' | 'ADMIN' | 'SALESPERSON'
}
