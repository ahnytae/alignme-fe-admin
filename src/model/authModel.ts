import { User } from './userModel';

interface AuthModel {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    kakaoMemberId: string;
    email: string;
    name: string;
    isAlready: boolean;
  };
}

interface SignUpInstructorResponse {
  instructorId: string;
  isMainInstructor: boolean;
  studioName: string;
  studioRegionName: string;
}

interface SignUpManagerResponse {
  managerId: string;
}

interface AutoLoginResponse {
  isExpired: boolean;
  user: Pick<User, 'id' | 'email' | 'name' | 'role'>;
  isMainInstructor: boolean;
}

export type { AuthModel, SignUpInstructorResponse, SignUpManagerResponse, AutoLoginResponse };
