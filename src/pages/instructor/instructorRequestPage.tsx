import { getPendingUserList, handleJoinRequest } from '@/api/users';
import {
  UserCardWrapper,
  UserCardAvatar,
  UserCardDetails,
  UserCardRight,
  UserCardLeft,
} from '@/components/card/userCard';
import PageTitle from '@/components/PageTitle';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constant/urls';
import { JoinStatus, PendingUserList } from '@/model/userModel';
import { UserRole } from '@/stores/useUserStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InstructorRequestPage = () => {
  const navigate = useNavigate();
  const [requestUsers, setRequestUsers] = useState<PendingUserList[]>([]);
  const [page, setPage] = useState(0);

  async function fetchPendingUserList(page: number, size: number) {
    const { data } = await getPendingUserList(UserRole.INSTRUCTOR, page, size);
    setRequestUsers(data.data);
    setPage(data.meta.total);
  }

  useEffect(() => {
    fetchPendingUserList(1, 10);
  }, []);

  async function handleApproveJoinRequest(userId: string, isApprove: Exclude<JoinStatus, 'pending'>) {
    try {
      await handleJoinRequest(userId, isApprove);
      navigate(PATH.instructor_list);
      fetchPendingUserList(1, 10);
      // Todo: toast message
    } catch {}
  }

  return (
    <div className="mx-5 max-w-[846px] sm:mx-auto">
      <PageTitle>강사 가입 요청</PageTitle>
      <div className="text-paragraph-tiny text-content-secondary">
        총 <span className="text-content-primary">{page}</span>명
      </div>

      {/* User card 구역 */}
      <div className="mt-4 grid grid-cols-1 gap-5">
        {requestUsers?.map((item: PendingUserList, i: number) => (
          <UserCardWrapper key={item.id + i}>
            <UserCardLeft>
              <UserCardAvatar img={item.profileImage || ''} />
              <UserCardDetails
                name={item.name}
                subLabel="요청일"
                subText={new Date(item.createdAt).toLocaleDateString()}
              />
            </UserCardLeft>
            <UserCardRight>
              <Button
                size="sm"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => handleApproveJoinRequest(item.id, 'rejected')}
              >
                거절
              </Button>
              <Button
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => handleApproveJoinRequest(item.id, 'approved')}
              >
                승인
              </Button>
            </UserCardRight>
          </UserCardWrapper>
        ))}
      </div>
    </div>
  );
};

export default InstructorRequestPage;
