import { create } from 'zustand';

export enum UserRole {
  MANAGER = 'MANAGER',
  INSTRUCTOR = 'INSTRUCTOR',
}

type UserState = {
  role: UserRole;
  userId: string;
  kakaoMemberId: string;
  email: string;
  userName: string;
  studioName: string;
  studioRegionName?: string;
};

type UserAction = {
  setUserRole: (role: UserRole) => void;
  setUserId: (userId: string) => void;
  setKakaoMemberId: (kakaoMemberId: string) => void;
  setEmail: (email: string) => void;
  setUserName: (userName: string) => void;
  setStudioName: (studioName: string) => void;
  setStudioRegionName?: (studioRegionName: string) => void;
};

const useUserStore = create<UserState & UserAction>((set) => ({
  role: UserRole.INSTRUCTOR,
  userId: '',
  kakaoMemberId: '',
  email: '',
  userName: '',
  studioName: '',
  setUserRole: (role: UserRole) => set(() => ({ role })),
  setUserId: (userId: string) => set(() => ({ userId })),
  setKakaoMemberId: (kakaoMemberId: string) => set(() => ({ kakaoMemberId })),
  setEmail: (email: string) => set(() => ({ email })),
  setUserName: (userName: string) => set(() => ({ userName })),
  setStudioName: (studioName: string) => set(() => ({ studioName })),
  setStudioRegionName: (studioRegionName: string) => set(() => ({ studioRegionName })),
}));

export default useUserStore;
