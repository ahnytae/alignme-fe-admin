import {
  UserCardWrapper,
  UserCardAvatar,
  UserCardDetails,
  UserCardRight,
  UserCardLeft,
} from '@/components/card/userCard';
import PageTitle from '@/components/PageTitle';
import { Button } from '@/components/ui/button';
const MemberRequestPage = () => {
  const dummy = [
    {
      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      name: '김아무개',
      approvalDt: '2024.05.01',
    },
    {
      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      name: '김아무개',
      approvalDt: '2024.05.01',
    },
    {
      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      name: '김아무개',
      approvalDt: '2024.05.01',
    },
  ];
  return (
    <div className="mx-5 max-w-[846px] sm:mx-auto">
      <PageTitle>회원 가입 요청</PageTitle>

      <div className="text-paragraph-tiny text-content-secondary">
        총 <span className="text-content-primary">123</span>명
      </div>

      {/* User card 구역 */}
      <div className="mt-4 grid grid-cols-1 gap-5">
        {dummy.map((item) => (
          <UserCardWrapper>
            <UserCardLeft>
              <UserCardAvatar img={item.img} />
              <UserCardDetails name={item.name} subLabel="요청일" subText={item.approvalDt} />
            </UserCardLeft>
            <UserCardRight>
              <Button size="sm" variant="outline" className="w-full sm:w-auto">
                거절
              </Button>
              <Button size="sm" className="w-full sm:w-auto">
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
