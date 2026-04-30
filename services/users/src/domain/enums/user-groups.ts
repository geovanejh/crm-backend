export const UserGroups = {
  Admin: 'admin',
  Sales: 'sales',
  User: 'user',
} as const;

export type UserGroups = (typeof UserGroups)[keyof typeof UserGroups];
