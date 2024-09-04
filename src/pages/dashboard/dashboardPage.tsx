import { Avatar } from './components/avatar';
import { TabRoot, TabList, TabTrigger, TabContent } from '@/components/ui/tab';
import { useNavigate, useLocation } from 'react-router-dom';
import { ContentList } from './components/contentList';
import { MemberList } from './components/memberList';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = (value: string) => {
    navigate(value);
  };

  return (
    <div className="mx-5 max-w-[846px] py-5 sm:mx-auto">
      <div className="mb-4 pb-4 pt-[72px]">
        <Avatar img="" title="선생님 이름" desc="센터 이름" />
      </div>

      <TabRoot defaultValue={pathname} onValueChange={(value) => handleClick(value)}>
        <TabList>
          <TabTrigger value="/dashboard/content">내 콘텐츠</TabTrigger>
          <TabTrigger value="/dashboard/member">회원목록</TabTrigger>
        </TabList>

        <TabContent value="/dashboard/content">
          <ContentList />
        </TabContent>
        <TabContent value="/dashboard/member">
          <MemberList />
        </TabContent>
      </TabRoot>
    </div>
  );
};
export default DashboardPage;
