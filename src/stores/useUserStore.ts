import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type JoinStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export enum UserRole {
  MEMBER = 'MEMBER',
  INSTRUCTOR = 'INSTRUCTOR',
}

type UserState = {
  role: UserRole;
  isMainInstructor: boolean;
  userId: string;
  kakaoMemberId: string;
  email: string;
  userName: string;
  studioName: string;
  studioRegionName?: string;
  profileImageUrl?: string;
};

type UserAction = {
  setUserRole: (role: UserRole) => void;
  setIsMainInstructor: (isMainInstructor: boolean) => void;
  setUserId: (userId: string) => void;
  setKakaoMemberId: (kakaoMemberId: string) => void;
  setEmail: (email: string) => void;
  setUserName: (userName: string) => void;
  setStudioName: (studioName: string) => void;
  setStudioRegionName: (studioRegionName: string) => void;
  setProfileImageUrl: (profileImageUrl: string) => void;
};

const useUserStore = create(
  persist<UserState & UserAction>(
    (set) => ({
      role: UserRole.INSTRUCTOR,
      isMainInstructor: false,
      userId: '',
      kakaoMemberId: '',
      email: '',
      userName: '',
      studioName: '',
      profileImageUrl: '',
      setUserRole: (role: UserRole) => set(() => ({ role })),
      setIsMainInstructor: (isMainInstructor: boolean) => set(() => ({ isMainInstructor })),
      setUserId: (userId: string) => set(() => ({ userId })),
      setKakaoMemberId: (kakaoMemberId: string) => set(() => ({ kakaoMemberId })),
      setEmail: (email: string) => set(() => ({ email })),
      setUserName: (userName: string) => set(() => ({ userName })),
      setStudioName: (studioName: string) => set(() => ({ studioName })),
      setStudioRegionName: (studioRegionName: string) => set(() => ({ studioRegionName })),
      setProfileImageUrl: (profileImageUrl: string) => set(() => ({ profileImageUrl })),
    }),
    { name: 'user', storage: createJSONStorage(() => sessionStorage) },
  ),
);

export default useUserStore;
