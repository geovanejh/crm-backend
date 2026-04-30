import { IsIn, IsUUID } from 'class-validator';
import { UserGroups } from '../../../domain/enums/user-groups';

export class AssignGroupDto {
  @IsUUID()
  userId!: string;

  @IsIn(Object.values(UserGroups))
  group!: UserGroups;
}
