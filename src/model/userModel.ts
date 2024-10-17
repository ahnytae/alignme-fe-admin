import { UserRole } from '@/stores/useUserStore';

type PageMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type JoinStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

type User = {
  id: string;
  kakaoMemberId: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
  profileImage?: string | null;
};

type InstructorOnUser = {
  id: string;
  kakaoMemberId: string;
  name: string;
  createdAt: Date;
  profileImage: string;
  instructor: Pick<Instructor, 'id' | 'name'>;
};

type Instructor = {
  // id: string;
  // joinStatus: JoinStatus;
  // user: User;
  id: string;
  kakaoMemberId: string;
  name: string;
  createdAt: Date;
  profileImage: string;
};

type PendingUserList = {
  id: string;
  name: string;
  createAt: Date;
  profileImage: string;
};

interface InstructorListResponse {
  data: { instructors: Instructor[] };
  meta: PageMeta;
}

// 강사 소속 회원 리스트
interface InstructorOnUserListResponse {
  data: {
    users: InstructorOnUser[];
  };
  meta: PageMeta;
}

// 가입 대기중인 유저 리스트
interface PendingUserListResponse {
  data: PendingUserList[];
  meta: PageMeta;
}

export type {
  PageMeta,
  JoinStatus,
  PendingUserList,
  Instructor,
  User,
  InstructorOnUser,
  InstructorListResponse,
  InstructorOnUserListResponse,
  PendingUserListResponse,
};
