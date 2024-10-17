import { User } from "./userModel";

interface AuthModel {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    kakaoMemberId: string;
    email: string;
    name: string;
    isAlerady: boolean;
  };
}

interface SignUpInstructorResponse {
  instructorId: string;
}

interface SignUpManagerResponse {
  managerId: string;
}

interface AutoLoginResponse {
  isExpired: boolean;
  user: User;
}

export type { AuthModel, SignUpInstructorResponse, SignUpManagerResponse, AutoLoginResponse };
