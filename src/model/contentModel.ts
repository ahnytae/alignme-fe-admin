import { PageMeta } from './userModel';

const ContentLevel = {
  EASY: 'EASY',
  NORMAL: 'NORMAL',
  HARD: 'HARD',
} as const;

type Content = {
  id: string;
  imageUrl: string;
  title: string;
  level: keyof typeof ContentLevel;
  description: string;
  createdAt: Date;
};

interface CreateContentDto {
  title: string;
  description: string;
  level: keyof typeof ContentLevel;
}

interface CreateContentResponse {
  id: string;
  imageUrl: string;
  title: string;
  level: keyof typeof ContentLevel;
  desc: string;
  createdAt: Date;
}

interface ContentsResponse {
  data: Content[];
  meta: PageMeta;
}

export type { Content, CreateContentDto, CreateContentResponse, ContentsResponse };
export { ContentLevel };
