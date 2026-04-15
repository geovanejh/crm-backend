import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user-dto'
import { UpdateUserDto } from './dto/update-user-dto'
import { NotFoundException } from '@nestjs/common'

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'OWNER',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'ADMIN',
    },
  ]

  findAll(role?: 'OWNER' | 'ADMIN' | 'SALESPERSON') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role)
      if (!rolesArray.length) {
        throw new NotFoundException(`No users found with role ${role}`)
      }
      return rolesArray
    }
    return this.users
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  create(createUserDto: CreateUserDto) {
    const highestId = this.users.reduce((maxId, user) => Math.max(maxId, user.id), 0)
    const newUser = { id: highestId + 1, ...createUserDto }
    this.users.push(newUser)
    return newUser
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = this.findOne(id)
    if (existingUser) {
      Object.assign(existingUser, updateUserDto)
      return existingUser
    } else {
      throw new NotFoundException('User not found')
    }
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id)
    if (index !== -1) {
      const removedUser = this.users.splice(index, 1)
      return removedUser[0]
    } else {
      throw new NotFoundException('User not found')
    }
    return null
  }
}
