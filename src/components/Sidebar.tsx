import { Outlet, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { StickyNote, TicketCheck, UsersRound } from 'lucide-react';
import { PATH } from '@/constant/urls';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

type Menu = { title: string; to: string; icon: JSX.Element };

type TabList = Record<string, Menu[]>;

const tabList: TabList = {
  dashboard: [{ title: '내 콘텐츠', to: PATH.content_list, icon: <StickyNote size={16} /> }],
  instructor: [
    { title: '강사 목록', to: PATH.instructor_list, icon: <UsersRound size={16} /> },
    { title: '가입 요청', to: PATH.instructor_request, icon: <TicketCheck size={16} /> },
  ],
  member: [
    { title: '회원 목록', to: PATH.member_list, icon: <UsersRound size={16} /> },
    { title: '가입 요청', to: PATH.member_request, icon: <TicketCheck size={16} /> },
  ],
};

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex size-full">
      {/** 메뉴 */}
      <div className="flex h-full w-[240px] flex-col gap-10 overflow-y-auto border-r-[1px] px-5 py-10">
        <Accordion type="multiple" defaultValue={[]}>
          {Object.entries(tabList).map(([category, menuList]) => (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger className="text-label-small text-content-primary">{category}</AccordionTrigger>
              {menuList.map((menu) => (
                <AccordionContent key={category + menu.to}>
                  <Link to={menu.to}>
                    <Button
                      className={`w-full justify-start gap-2 text-label-small text-content-primary transition-all hover:bg-secondary-100 ${pathname !== menu.to ? 'text-content-secondary' : ''}`}
                      startAdornment={menu.icon}
                      variant="custom"
                    >
                      {menu.title}
                    </Button>
                  </Link>
                </AccordionContent>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="w-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
