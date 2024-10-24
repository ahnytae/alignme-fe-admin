import { ProfileResponse } from '@/model/profileModel';
import api from '../common';

/** 프로필 조회 */
export const getProfile = async () => {
  return await api.get<ProfileResponse>('/profile');
};

/** 프로필 업데이트 */
export const updateProfile = async (updateProfileDto: FormData) => {
  return await api.post('/profile/update', updateProfileDto, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
