import { Injectable } from '@nestjs/common'

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
      return this.users.filter((user) => user.role === role)
    }
    return this.users
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id)
  }

  create(user: { name: string; email: string; role: 'OWNER' | 'ADMIN' | 'SALESPERSON' }) {
    const highestId = this.users.reduce((maxId, user) => Math.max(maxId, user.id), 0)
    const newUser = { id: highestId + 1, ...user }
    this.users.push(newUser)
    return newUser
  }

  update(id: number, user: { name?: string; email?: string; role?: 'OWNER' | 'ADMIN' | 'SALESPERSON' }) {
    const existingUser = this.findOne(id)
    if (existingUser) {
      Object.assign(existingUser, user)
      return existingUser
    }
    return null
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id)
    if (index !== -1) {
      const removedUser = this.users.splice(index, 1)
      return removedUser[0]
    }
    return null
  }
}
