import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User } from './user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([User])], // registra o Repository<User> neste modulo
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
