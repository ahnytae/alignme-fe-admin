import {
  InstructorListResponse,
  InstructorOnUserListResponse,
  JoinStatus,
  PendingUserListResponse,
} from '@/model/userModel';
import api from '../common';

/** 해당 스튜디오 강사 전체목록 API */
export const getInstructors = async () => {
  return await api.get<InstructorListResponse>('/users/instructors');
};

/** 사용자 내보내기 */
export const removeUser = async (userId: string) => {
  return await api.delete(`/users/leave-user/?userId=${userId}`);
};

/** 회원 리스트 */
export const getMembers = async () => {
  return await api.get<InstructorOnUserListResponse>(`/users/instructor/members`);
};

/** 가입 대기중인 유저 리스트 */
export const getPendingUserList = async (page: number, limit: number) => {
  return await api.get<PendingUserListResponse>(`/users/join-requests?page=${page}&limit=${limit}`);
};

/** 가입 요청 승인 or 거절 */
export const handleJoinRequest = async (userId: string, isApprove: JoinStatus) => {
  return await api.post(`/users/approve-join-request`, { userId, isApprove });
};

/** 멤버가 속한 강사 변경 */
export const changeInstructor = async (instructorId: string, memberId: string) => {
  return await api.post(`/users/change-instructor`, { instructorId, memberId });
};
