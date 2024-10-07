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
import RemoveUserDialog from '@/components/dialog/removeUserDialog';

interface instructorListProps extends HTMLAttributes<HTMLDivElement> {}
const instructorListPage: FunctionComponent<instructorListProps> = () => {
  return (
    <div className="mx-5 max-w-[846px] sm:mx-auto">
      <PageTitle>강사 목록</PageTitle>
      <div className="text-paragraph-tiny text-content-secondary">
        총 <span className="text-content-primary">123</span>명
      </div>

      {/* User card 구역 */}
      <div className="mt-4 grid grid-cols-1 gap-5">
        {[...Array(10)].map((_, i) => (
          <UserCardWrapper>
            <UserCardLeft>
              <UserCardAvatar img={''} />
              <UserCardDetails name={'name'} subLabel="승인일" subText={'date'} />
            </UserCardLeft>

            <UserCardRight>
              <RemoveUserDialog userId={i} username={'김아무개'} type="instructor">
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

export default instructorListPage;
