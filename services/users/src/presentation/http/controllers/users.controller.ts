import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GetUserByIdUseCase } from '../../../application/use-cases/get-user-by-id/get-user-by-id.usecase';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthenticatedUser } from '../strategies/jwt.strategy';
import { AssignGroupToUserUseCase } from '../../../application/use-cases/assign-group-to-user.usecase/assign-group-to-user.usecase';
import { AssignGroupDto } from '../dtos/assign-group.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserById: GetUserByIdUseCase,
    private readonly assignGroupToUser: AssignGroupToUserUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: Request & { user: AuthenticatedUser }) {
    return this.getUserById.execute(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('assign-group')
  assignGroup(@Body() dto: AssignGroupDto) {
    return this.assignGroupToUser.execute(dto.userId, dto.group);
  }
}
