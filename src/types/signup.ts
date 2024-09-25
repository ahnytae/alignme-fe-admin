export type UserRole = 'mananger' | 'instructor';

export type SignUpReq = {
  kakaoMemberId: string;
  studioName: string;
  studioRegionName: string;
  name: string;
  userRole: UserRole;
};
