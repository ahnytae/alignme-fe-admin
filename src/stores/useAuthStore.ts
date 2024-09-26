import { create } from 'zustand';

interface AuthStore {
  isLogin: boolean;
  setIsLogin: (flag: boolean) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isLogin: false,
  setIsLogin: (flag) => set({ isLogin: flag }),
}));

export default useAuthStore;
