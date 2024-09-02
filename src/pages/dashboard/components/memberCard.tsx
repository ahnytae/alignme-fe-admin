import { HTMLAttributes } from 'react';

interface MemberCardProps extends HTMLAttributes<HTMLDivElement> {
  img?: string;
  name: string;
  approvalDt: string;
}

const MemberCard = ({ img, name, approvalDt, ...props }: MemberCardProps) => {
  return (
    <div {...props} className="flex flex-col gap-4 rounded-xl border border-border-primary p-4">
      <div className="group block flex-shrink-0">
        <div className="flex items-center">
          {/* avatar 구역 */}
          <div>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="inline-block h-14 w-14 rounded-full"
            />
          </div>
          {/* 이름, 승인일 */}
          <div className="ml-3">
            <p className="text-label-base text-content-primary ">{name}</p>
            <p className="mt-1 text-paragraph-tiny text-content-tertiary">
              승인일 <span className="text-content-secondary">{approvalDt}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MemberCard };
