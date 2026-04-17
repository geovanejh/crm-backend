import { Injectable, Param } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user-dto'
import { UpdateUserDto } from './dto/update-user-dto'
import { NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { UserRole } from './enums/user-role.enum'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll(role?: UserRole): Promise<User[]> {
    if (role) {
      return this.usersRepository.find({ where: { role } })
    }
    return this.usersRepository.find({ where: { role } })
  }

  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto) // cria instancia em memoria (NAO salva)
    return this.usersRepository.save(user) // INSERT INTO users (...) VALUES (...)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id) // busca ou lanca 404
    Object.assign(user, updateUserDto) // mescla os campos atualizados
    return this.usersRepository.save(user) // UPDATE users SET ... WHERE id = $1
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete({ id })
  }
}
