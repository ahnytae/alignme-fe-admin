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

const ContentListPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const { setTitle, setLevel, setDescription, setCreatedAt, setImageUrl, setInstructorInfo } = useContent();

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
      <PageTitle>내 콘텐츠 관리</PageTitle>
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
