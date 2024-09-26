interface AuthModel {
  data: {
    accessToken: string;
    refreshToken: string;
    isAleradyUser: boolean;
    kakaoMemberId: number;
  };
}

export type { AuthModel };
