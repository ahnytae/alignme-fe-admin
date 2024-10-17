import { Bedge } from '@/components/ui/bedge';
import { ContentLevel } from '@/model/contentModel';
import useContent from '@/stores/useContent';
import { FunctionComponent, HTMLAttributes } from 'react';

interface ContentCardProps {
  imageUrl: string;
  title: string;
  level: keyof typeof ContentLevel;
  createdAt: Date;
  onClick: () => void;
}

const ContentCard: FunctionComponent<ContentCardProps> = ({
  imageUrl,
  title,
  level,
  createdAt,
  onClick,
}: ContentCardProps) => {
  return (
    <div onClick={onClick} className="flex cursor-pointer flex-col gap-3 rounded-xl border border-border-primary p-4">
      <div className="flex gap-3 border-b border-border-primary pb-3">
        {/* 운동 사진 */}
        <div className="h-[82px] w-[82px]">
          <img
            className="h-full w-full rounded-lg border-[0.8px] border-border-primary object-cover"
            alt="운동 사진"
            src={imageUrl}
          ></img>
        </div>
        {/* 운동 이름, 난이도 */}
        <div>
          <div className="text-label-base text-content-secondary">{title}</div>
          <div className="mt-2">
            <Bedge variant="yellow">
              {level === ContentLevel.EASY && '쉬움'}
              {level === ContentLevel.NORMAL && '보통'}
              {level === ContentLevel.HARD && '어려움'}
            </Bedge>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        {/* 등록일, 수강생 운동 횟수 */}
        <div className="text-paragraph-tiny text-content-tertiary">
          등록일
          <span className="ml-1 text-content-secondary">{new Date(createdAt).toLocaleDateString()}</span>
        </div>
        <div className="text-paragraph-tiny text-content-tertiary">
          {/* 수강생 운동횟수 */}
          {/* <span className="ml-1 text-content-primary">123회</span> */}
        </div>
      </div>
    </div>
  );
};

export { ContentCard };
