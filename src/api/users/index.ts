import { InstructorListResponse, InstructorOnUserListResponse } from '@/model/userModel';
import api from '../common';

/** 해당 스튜디오 강사 전체목록 API */
export const getInstructors = async () => {
  return await api.get<InstructorListResponse>('/users/instructors');
};

/** 사용자 내보내기 */
export const removeUser = async (userId: string) => {
  return await api.delete(`/users/leave-user/${userId}`);
};

/** 회원 리스트 */
export const getInstructorOnUsers = async () => {
  return await api.get<InstructorOnUserListResponse>(`/users/instructor/members`);
};
