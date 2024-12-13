import { ContentsResponse, CreateContentResponse } from '@/model/contentModel';
import api from '../common';
import { SkletonData } from '@/core/CalculatePose';

/** 콘텐츠 조회 api */
export const getContents = async () => {
  return await api.get<ContentsResponse>('/content/contents');
};

/** 콘텐츠 생성 api */
export const createContent = async (createContentDto: FormData) => {
  return await api.post<CreateContentResponse>('/content', createContentDto, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/** 콘텐츠 수정 api */
export const modifyContent = async (contentId: string, createContentDto: FormData) => {
  return await api.patch<CreateContentResponse>(`/content/${contentId}`, createContentDto, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/** 콘텐츠 삭제 api */
export const deleteContent = async (contentId: string) => {
  return await api.delete(`/content/${contentId}`);
};
