import { FunctionComponent, HTMLAttributes } from 'react';
import { MemberCard } from './memberCard';

interface MemberListProps extends HTMLAttributes<HTMLDivElement> {}
const MemberList: FunctionComponent<MemberListProps> = () => {
  return (
    <>
      <div className="text-paragraph-tiny text-content-secondary">
        총 <span className="text-content-primary">123</span>명
      </div>

      {/* member card 구역 */}
      <div className="mt-4 grid grid-cols-1 gap-5">
        {[...Array(10)].map((_, i) => (
          <MemberCard key={i} name="000" approvalDt="2024.05.01" />
        ))}
      </div>
    </>
  );
};

export { MemberList };
