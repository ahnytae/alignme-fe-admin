import { ContentLevel } from '@/model/contentModel';
import { create } from 'zustand';

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
}

const useContent = create<CurrentContentStore>((set) => ({
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
}));

export default useContent;
