import { create } from 'zustand';

interface AuthStore {
  isLogin: boolean;
  isLoading: boolean;
  setIsLogin: (flag: boolean) => void;
  setIsLoading: (flag: boolean) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isLogin: false,
  isLoading: true,
  setIsLogin: (flag) => set({ isLogin: flag }),
  setIsLoading: (flag) => set({ isLoading: flag }),
}));

export default useAuthStore;
