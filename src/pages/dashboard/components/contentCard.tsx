import { Bedge } from '@/components/ui/bedge';
import { FunctionComponent, HTMLAttributes } from 'react';

interface ContentCardProps extends HTMLAttributes<HTMLDivElement> {}

const ContentCard: FunctionComponent<ContentCardProps> = ({ ...props }) => {
  return (
    <div {...props} className="flex cursor-pointer flex-col gap-3 rounded-xl border border-border-primary p-4">
      <div className="flex gap-3 border-b border-border-primary pb-3">
        {/* 운동 사진 */}
        <div className="h-[82px] w-[82px]">
          <img
            className="h-full w-full rounded-lg border-[0.8px] border-border-primary object-cover"
            alt="운동 사진"
            src="https://s3-alpha-sig.figma.com/img/dfaf/a660/435c4ebc242c093142f67a82a2421c7c?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BavtzYY8WkURd4TQWu1twyt2zdRLK-5NBeJl1CfLQRuN6A7WS11d4DqoiYlpX5XIALq3MaDH7UwlaT2wwAE-Z3CcWdz15J975t-Ng0IqCDe4v1g9Fe~vpvPIjiILB74duhjF21s8t7-Wt1FhhNuUwIUuIR02E7d7pBn9HPFxXvJetr-qlN9yIK2usguUU~Bhla0YpoZC1zQMrr850jSZsogxMbisBBuQ0EVyr9hunOLQKWBnKsEsspb7r~2eCTJj~2~E9OZ~Hu-sR4pOQw7UsJ9hreEOSlqCeh1Jg2lQoXIU9MIwe34mFNsluEWZE3~uD82a3iVtZ30pezQz666PTg__"
          ></img>
        </div>
        {/* 운동 이름, 난이도 */}
        <div>
          <div className="text-label-base text-content-secondary">운동이름</div>
          <div className="mt-2">
            <Bedge variant="yellow">보통</Bedge>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        {/* 등록일, 수강생 운동 횟수 */}
        <div className="text-paragraph-tiny text-content-tertiary">
          등록일
          <span className="ml-1 text-content-secondary">24.03.02</span>
        </div>
        <div className="text-paragraph-tiny text-content-tertiary">
          수강생 운동횟수
          <span className="ml-1 text-content-primary">123회</span>
        </div>
      </div>
    </div>
  );
};

export { ContentCard };
