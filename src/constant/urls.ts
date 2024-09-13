export const kakaoRedirectUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

export const PATH = {
  /** 내 콘텐츠 */
  content_list: '/content/list',
  /** 콘텐츠 생성 */
  content_create: '/content/create',
  /** 콘텐츠 상세정보 */
  content_id: '/content/:id',

  /** 강사 목록 */
  instructor_list: '/instructor/list',
  /** 가입요청 */
  instructor_request: '/instructor/request',

  /** 회원 목록 */
  member_list: '/member/list',
  /** 가입요청 */
  member_request: '/member/request',

  /** 마이페이지 */
  myPage: 'my-page',

  /** 로그인 */
  login: '/login',
  /** 카카오 인증 */
  auth_kakao_success: '/auth/kakao/success',
  /** 회원가입 유형 선택 */
  signupType: '/signup-type',
  /** 회원가입 정보 입력 */
  signup_type_info: '/signup/:type/info',
} as const;

/**
 * react-router 동적 라우팅 매개변수 주입
 * @example
 * seg('/hello/:type/:id', ['world', 1000]); // '/hello/world/1000'
 * seg(PATH.signup_type_info, [type]); // '/signup/instructor/info'
 */
export const seg = (url: string, params: (string | number)[]) => {
  let index = 0;
  return url.replace(/:([^/]+)/g, () => {
    return params[index++].toString() || '';
  });
};
