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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MemberRequestPage = () => {
  const navigate = useNavigate();
  const [requestUsers, setRequestUsers] = useState<PendingUserList[]>([]);
  const [page, setPage] = useState(0);

  async function fetchPendingUserList(page: number, size: number) {
    const { data } = await getPendingUserList(page, size);
    setRequestUsers(data.data);
    setPage(data.meta.total);
  }

  useEffect(() => {
    fetchPendingUserList(1, 10);
  }, []);

  async function handleApproveJoinRequest(userId: string, isApprove: Exclude<JoinStatus, 'PENDING'>) {
    try {
      await handleJoinRequest(userId, isApprove);
      navigate(PATH.member_request);
      fetchPendingUserList(1, 10);
      // Todo: toast message
    } catch {}
  }

  return (
    <div className="mx-5 max-w-[846px] sm:mx-auto">
      <PageTitle>회원 가입 요청</PageTitle>

      <div className="text-paragraph-tiny text-content-secondary">
        총 <span className="text-content-primary">{page}</span>명
      </div>

      {/* User card 구역 */}
      <div className="mt-4 grid grid-cols-1 gap-5">
        {requestUsers?.map((item: PendingUserList, i: number) => (
          <UserCardWrapper key={item.name + i}>
            <UserCardLeft>
              <UserCardAvatar img={item.profileImage || ''} />
              <UserCardDetails
                name={item.name}
                subLabel="요청일"
                subText={new Date(item.createAt).toLocaleDateString()}
              />
            </UserCardLeft>
            <UserCardRight>
              <Button
                size="sm"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => handleApproveJoinRequest(item.id, 'REJECTED')}
              >
                거절
              </Button>
              <Button
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => handleApproveJoinRequest(item.id, 'APPROVED')}
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

export default MemberRequestPage;
