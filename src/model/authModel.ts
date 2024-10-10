interface AuthModel {
  message: string;
  data: {
    isAleradyUser: true;
    accessToken: string;
    refreshToken: string;
    kakaoMemberId: string;
    email: string;
    name: string;
  };
}

interface SignUpInstructorResponse {
  instructorId: string;
}

interface SignUpManagerResponse {
  managerId: string;
}

export type { AuthModel, SignUpInstructorResponse, SignUpManagerResponse };
