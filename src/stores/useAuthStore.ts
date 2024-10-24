import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStore {
  isLogin: boolean;
  setIsLogin: (flag: boolean) => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLogin: false,
      setIsLogin: (flag) => set({ isLogin: flag }),
    }),
    { name: 'auth', storage: createJSONStorage(() => sessionStorage) },
  ),
);

export default useAuthStore;
