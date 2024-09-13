import { Outlet } from 'react-router-dom';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { StickyNote, TicketCheck, UsersRound } from 'lucide-react';
import { PATH } from '@/constant/urls';

type Menu = { title: string; to: string; icon: JSX.Element };

type TabList = Record<string, Menu[]>;

const tabList: TabList = {
  '콘텐츠 관리': [{ title: '내 콘텐츠', to: PATH.content_list, icon: <StickyNote size={16} /> }],
  '강사 관리': [
    { title: '강사 목록', to: PATH.instructor_list, icon: <UsersRound size={16} /> },
    { title: '가입 요청', to: PATH.instructor_request, icon: <TicketCheck size={16} /> },
  ],
  '회원 관리': [
    { title: '회원 목록', to: PATH.member_list, icon: <UsersRound size={16} /> },
    { title: '가입 요청', to: PATH.member_request, icon: <TicketCheck size={16} /> },
  ],
};

const Sidebar = () => {
  return (
    <div className="flex size-full">
      <div className="flex h-full w-[240px] flex-col gap-10 overflow-y-auto bg-secondary-100 px-5 py-10">
        {Object.entries(tabList).map(([category, menuList]) => (
          <div key={category} className="flex flex-col gap-2">
            <h3 className="ml-3 text-paragraph-tiny text-content-secondary">{category}</h3>
            <ul className="flex flex-col gap-1">
              {menuList.map((menu) => {
                return (
                  <li key={category + menu.title}>
                    <Link to={menu.to}>
                      <Button
                        className="w-full justify-start gap-2 bg-secondary-100 text-paragraph-base transition-all hover:bg-brand-primary/60"
                        startAdornment={menu.icon}
                        variant="custom"
                      >
                        {menu.title}
                      </Button>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="w-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
