import { FunctionComponent, HTMLAttributes } from 'react';
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
interface MemberListProps extends HTMLAttributes<HTMLDivElement> {}
const MemberListPage: FunctionComponent<MemberListProps> = () => {
  return (
    <div className="mx-5 max-w-[846px] sm:mx-auto">
      <PageTitle>회원 목록</PageTitle>
      <div className="text-paragraph-tiny text-content-secondary">
        총 <span className="text-content-primary">123</span>명
      </div>

      {/* User card 구역 */}
      <div className="mt-4 grid grid-cols-1 gap-5">
        {[...Array(10)].map((_, i) => (
          <UserCardWrapper>
            <UserCardLeft>
              <UserCardAvatar img={''} />
              <UserCardDetails name={'name'} subLabel="승인일" subText={'date'} additionalInfo={'000선생님'} />
            </UserCardLeft>
            {/* role = manager만 (추후 처리) */}
            <UserCardRight>
              <InstructorChangeDialog>
                <Button size="sm" variant="outline" className="w-full sm:w-auto">
                  소속강사 변경
                </Button>
              </InstructorChangeDialog>
              <RemoveUserDialog userId={i} username={'김아무개'} type="member">
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
