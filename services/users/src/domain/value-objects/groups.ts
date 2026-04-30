import { UserGroups } from '../enums/user-groups';
import { InvalidGroupsError } from '../errors/invalid-groups';

export class Groups {
  constructor(private readonly groups: UserGroups[]) {}

  private static isValidGroup(group: string): group is UserGroups {
    return Object.values(UserGroups).includes(group as UserGroups);
  }

  static fromArray(groups: UserGroups[]): Groups {
    if (groups.length === 0) {
      throw new InvalidGroupsError(groups);
    }
    if (!groups.every((g) => Groups.isValidGroup(g))) {
      throw new InvalidGroupsError(groups);
    }
    const unique = Array.from(new Set(groups));
    return new Groups(unique);
  }

  has(group: UserGroups): boolean {
    return this.groups.includes(group);
  }

  add(group: UserGroups): Groups {
    if (!Groups.isValidGroup(group)) {
      throw new InvalidGroupsError([group]);
    }

    if (!this.has(group)) {
      return new Groups([...this.groups, group]);
    }
    return this;
  }

  remove(group: UserGroups): Groups {
    if (this.has(group)) {
      const result = this.groups.filter((g) => g !== group);
      return new Groups(result);
    }
    return this;
  }

  equals(other: Groups): boolean {
    if (this.groups.length !== other.groups.length) return false;
    return this.groups.every((g) => other.groups.includes(g));
  }

  get value(): UserGroups[] {
    return [...this.groups];
  }
}
