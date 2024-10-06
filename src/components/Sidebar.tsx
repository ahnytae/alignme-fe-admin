import { memo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { AlignJustify, StickyNote, TicketCheck, UsersRound } from 'lucide-react';
import { PATH } from '@/constant/urls';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

type Menu = { title: string; to: string; icon: JSX.Element };

type TabList = Record<
  string,
  {
    categoryName: string;
    menuList: Menu[];
  }
>;

const tabList: TabList = {
  content: {
    categoryName: '콘텐츠 관리',
    menuList: [{ title: '내 콘텐츠', to: PATH.content_list, icon: <StickyNote size={16} /> }],
  },
  instructor: {
    categoryName: '강사 관리',
    menuList: [
      { title: '강사 목록', to: PATH.instructor_list, icon: <UsersRound size={16} /> },
      { title: '가입 요청', to: PATH.instructor_request, icon: <TicketCheck size={16} /> },
    ],
  },
  member: {
    categoryName: '회원 관리',
    menuList: [
      { title: '회원 목록', to: PATH.member_list, icon: <UsersRound size={16} /> },
      { title: '가입 요청', to: PATH.member_request, icon: <TicketCheck size={16} /> },
    ],
  },
};

const Sidebar = () => {
  const { pathname } = useLocation();

  const [openedCategory] = useState(() => pathname.split('/')[1]);

  const Menu = memo(() => {
    return (
      <Accordion type="multiple" defaultValue={[openedCategory]}>
        {Object.entries(tabList).map(([domain, tab]) => (
          <AccordionItem key={domain} value={domain}>
            {/** 카테고리 */}
            <AccordionTrigger className="text-label-small text-content-primary">{tab.categoryName}</AccordionTrigger>

            {/** 메뉴 리스트 */}
            {tab.menuList.map((menu) => (
              <AccordionContent key={domain + menu.to}>
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
    );
  });

  return (
    <div className="flex size-full">
      {/** 사이드 바 */}
      <div className="mobile:w-fit flex h-full w-[240px] flex-col overflow-y-auto border-r-[1px] px-5 py-10">
        <Sheet>
          <SheetTrigger className="mobile:block hidden">
            <AlignJustify />
          </SheetTrigger>
          <SheetContent side="left">
            <Menu />
          </SheetContent>
        </Sheet>
        <div className="mobile:hidden">
          <Menu />
        </div>
      </div>

      <div className="w-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
