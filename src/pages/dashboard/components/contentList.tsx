import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { ContentCard } from './contentCard';
import { FunctionComponent, HTMLAttributes } from 'react';

interface ContentProps extends HTMLAttributes<HTMLDivElement> {}
const ContentList: FunctionComponent<ContentProps> = () => {
  const navigate = useNavigate();
  const clickContentCard = (id: number) => {
    navigate('/dashboard/content/' + id);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-paragraph-tiny text-content-secondary">
          총 <span className="text-content-primary">123</span>개
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="gap-2"
          startAdornment={<Plus className="h-4 w-4 text-white" />}
        >
          <Link to="/dashboard/content/create">새 콘텐츠 등록</Link>
        </Button>
      </div>

      {/* content card 구역 */}
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {[...Array(10)].map((_, i) => (
          <ContentCard key={i} onClick={() => clickContentCard(i)} />
        ))}
      </div>
    </>
  );
};

export { ContentList };
