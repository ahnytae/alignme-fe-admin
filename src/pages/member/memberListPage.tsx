import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import {
  UserCardWrapper,
  UserCardAvatar,
  UserCardLeft,
  UserCardRight,
  UserCardDetails,
} from '@/components/card/userCard';
import PageTitle from '@/components/PageTitle';
import { Button } from '@/components/ui/button';
import InstructorChangeDialog from './components/InstructorChangeDialog';
import RemoveUserDialog from '@/components/dialog/removeUserDialog';
import { getInstructorOnUsers } from '@/api/users';
interface MemberListProps extends HTMLAttributes<HTMLDivElement> {}
const MemberListPage: FunctionComponent<MemberListProps> = () => {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const { data } = await getInstructorOnUsers();
      setUsers(data.data.users);
    })();
  }, []);

  if (!users) return <div>Loading...</div>;

  return (
    <div className="mx-5 max-w-[846px] sm:mx-auto">
      <PageTitle>회원 목록</PageTitle>
      <div className="text-paragraph-tiny text-content-secondary">
        총 <span className="text-content-primary">123</span>명
      </div>

      {/* User card 구역 */}
      <div className="mt-4 grid grid-cols-1 gap-5">
        {users.map((user: any, i: number) => (
          <UserCardWrapper key={user.kakaoMemberId + i}>
            <UserCardLeft>
              <UserCardAvatar img={''} />
              <UserCardDetails
                name={`user.user.name`}
                subLabel="승인일"
                subText={new Date(user.createdAt).toLocaleDateString()}
                additionalInfo={`${user.instructor.name} 강사님`}
              />
            </UserCardLeft>
            {/* role = manager만 (추후 처리) */}
            <UserCardRight>
              <InstructorChangeDialog>
                <Button size="sm" variant="outline" className="w-full sm:w-auto">
                  소속강사 변경
                </Button>
              </InstructorChangeDialog>
              <RemoveUserDialog userId={user.kakaoMemberId} username={user.name} type="member">
                <Button size="sm" className="w-full sm:w-auto">
                  내보내기
                </Button>
              </RemoveUserDialog>
            </UserCardRight>
          </UserCardWrapper>
        ))}
      </div>
    </div>
  );
};

export default MemberListPage;
