import { Button } from '@/components/ui/button';
import { BackButton } from './components/backButton';
import useContent from '@/stores/useContent';
import { ContentLevel } from '@/model/contentModel';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '@/constant/urls';
import { deleteContent } from '@/api/content';

const DashboardContentDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { title, level, description, createdAt, imageUrl, instructorInfo } = useContent();

  async function onDeleteContentHandler() {
    await deleteContent(`${id}`);
    navigate(PATH.content_list);
  }

  return (
    <div className="relative mx-5 my-7 min-h-screen max-w-[630px] sm:mx-auto">
      <BackButton />
      <img alt="운동 사진" src={imageUrl} className="h-[264px] w-full rounded-xl object-cover" />
      <div className="flex flex-col gap-6 py-5">
        <div className="text-heading-small text-content-primary">{title}</div>

        <dl className="grid grid-cols-3 overflow-hidden rounded-lg bg-background-secondary text-center">
          <div className="flex flex-col rounded-lg p-4">
            <dt className="text-paragraph-tiny text-content-tertiary">난이도</dt>
            <dd className="text-label-base text-content-secondary">
              {level === ContentLevel.EASY && '쉬움'}
              {level === ContentLevel.NORMAL && '보통'}
              {level === ContentLevel.HARD && '어려움'}
            </dd>
          </div>

          <div className="flex flex-col rounded-lg p-4">
            <dt className="text-paragraph-tiny text-content-tertiary">등록일자</dt>
            <dd className="text-label-base text-content-secondary">{new Date(createdAt).toLocaleDateString()}</dd>
          </div>

          <div className="flex flex-col rounded-lg p-4">
            <dt className="text-paragraph-tiny text-content-tertiary">강사님</dt>
            <dd className="text-label-base text-content-secondary">{instructorInfo.instructorName} 강사님</dd>
          </div>
        </dl>

        <div className="mb-10 flex flex-col gap-2">
          <div className="text-label-large text-content-primary">설명</div>
          <div className="h-[300px] overflow-y-auto text-paragraph-base text-content-secondary ">{description}</div>
        </div>
      </div>

      <div className="sticky bottom-6 mt-4 flex w-full flex-col justify-end gap-2">
        <Button
          variant="secondary"
          size="area"
          onClick={() => navigate(`${PATH.content_edit.replace(':id', `${id}`)}`)}
        >
          수정하기
        </Button>
        <Button
          variant="custom"
          size="area"
          className="border border-border-primary bg-background-primary text-system-error"
          onClick={onDeleteContentHandler}
        >
          삭제하기
        </Button>
      </div>
    </div>
  );
};
export default DashboardContentDetailPage;
