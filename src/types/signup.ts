export type UserRole = 'manager' | 'instructor';

export type SignUpReq = {
  studioName: string;
  studioRegionName: string;
  name: string;
  userRole: UserRole;
};
