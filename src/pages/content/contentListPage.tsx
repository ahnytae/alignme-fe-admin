import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { ContentCard } from './components/contentCard';
import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import PageTitle from '@/components/PageTitle';
import { getContents } from '@/api/content';
import { Content } from '@/model/contentModel';
import { PATH } from '@/constant/urls';
import useContent from '@/stores/useContent';
import useUserStore from '@/stores/useUserStore';
// import profileImg from '@/assets/img/default-profile.png';

const ContentListPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const { setTitle, setLevel, setDescription, setCreatedAt, setImageUrl, setInstructorInfo } = useContent();
  const { userName, studioName, studioRegionName, profileImageUrl, isMainInstructor } = useUserStore();

  const [contents, setContents] = useState<Content[]>([]);
  const [total, setTotal] = useState(0);

  const clickContentCard = (content: Content) => {
    // 이동 될 페이지에 데이터 전달
    setTitle(content.title);
    setLevel(content.level);
    setDescription(content.description);
    setCreatedAt(content.createdAt);
    setImageUrl(content.imageUrl);
    setInstructorInfo(content.instructor);

    navigate('/content/' + content.id);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getContents();
        setContents(data.data);
        setTotal(data.meta.total);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="mx-5 max-w-[846px] sm:mx-auto">
      {/* <PageTitle>내 콘텐츠 관리</PageTitle> */}

      <div className="flex w-full items-center gap-3 bg-white px-5 pb-4 pt-8">
        <div className="my-auto flex items-center gap-3 self-stretch">
          <img
            loading="lazy"
            src={profileImageUrl || '/assets/img/default-profile.png'}
            alt={`Instructor ${userName}`}
            className="my-auto aspect-square w-14 shrink-0 self-stretch object-contain"
          />
          <div className="my-auto flex  flex-col justify-center self-stretch">
            <div className=" max-w-full text-lg font-semibold leading-loose text-zinc-900">
              {userName} {isMainInstructor ? '대표 강사님' : '강사님'}
            </div>
            <div className="text-xs font-medium leading-none text-zinc-600">{studioName}</div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-1 flex-col rounded-2xl pb-4">
        <div className="flex w-full items-center gap-1.5 overflow-hidden border-b border-solid border-b-zinc-200 bg-white text-lg font-semibold text-zinc-950">
          <div className="my-auto flex items-center gap-6 self-stretch">
            <div className="my-auto gap-2 self-stretch border-b-[3px] border-solid border-b-zinc-900 py-3">
              전체 보기
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-paragraph-tiny text-content-secondary">
          총 <span className="text-content-primary">{total}</span>개
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="gap-2"
          startAdornment={<Plus className="h-4 w-4 text-white" />}
          onClick={() => navigate(PATH.content_create)}
        >
          <p>새 콘텐츠 등록</p>
        </Button>
      </div>

      {/* content card 구역 */}
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {contents?.map((content: Content, i) => (
          <ContentCard
            key={i}
            title={content.title}
            imageUrl={content.imageUrl}
            level={content.level}
            createdAt={content.createdAt}
            onClick={() => clickContentCard(content)}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentListPage;
