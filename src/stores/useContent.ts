import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ContentLevel, InstructorInfo } from '@/model/contentModel';

interface CurrentContentStore {
  title: string;
  setTitle: (title: string) => void;
  level: keyof typeof ContentLevel;
  setLevel: (level: keyof typeof ContentLevel) => void;
  description: string;
  setDescription: (description: string) => void;
  createdAt: Date;
  setCreatedAt: (createdAt: Date) => void;
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
  instructorInfo: InstructorInfo;
  setInstructorInfo: (instructorInfo: InstructorInfo) => void;
}

const useContent = create(
  persist<CurrentContentStore>(
    (set) => ({
      title: '',
      setTitle: (title) => set({ title }),
      level: ContentLevel.EASY,
      setLevel: (level) => set({ level }),
      description: '',
      setDescription: (description) => set({ description }),
      createdAt: new Date(),
      setCreatedAt: (createdAt) => set({ createdAt }),
      imageUrl: '',
      setImageUrl: (imageUrl) => set({ imageUrl }),
      instructorInfo: {} as InstructorInfo,
      setInstructorInfo: (instructorInfo) => set({ instructorInfo }),
    }),
    { name: 'content', storage: createJSONStorage(() => sessionStorage) },
  ),
);

export default useContent;
