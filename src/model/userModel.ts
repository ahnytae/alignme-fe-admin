import { UserRole } from '@/stores/useUserStore';

type PageMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

enum JoinStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

type User = {
  id: string;
  kakaoMemberId: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
};

type InstructorOnUser = {
  user: User;
  instructor: Instructor;
};

type Instructor = {
  id: string;
  joinStatus: JoinStatus;
  user: User;
};

interface InstructorListResponse {
  data: Instructor[];
  meta: PageMeta;
}

// 강사 소속 회원 리스트
interface InstructorOnUserListResponse {
  data: {
    users: InstructorOnUser[];
  };
  meta: PageMeta;
}

export type {
  PageMeta,
  JoinStatus,
  Instructor,
  User,
  InstructorOnUser,
  InstructorListResponse,
  InstructorOnUserListResponse,
};
