import { FunctionComponent, HTMLAttributes, useEffect, useId, useState } from 'react';
import {
  UserCardWrapper,
  UserCardAvatar,
  UserCardLeft,
  UserCardRight,
  UserCardDetails,
} from '@/components/card/userCard';
import PageTitle from '@/components/PageTitle';
import { Button } from '@/components/ui/button';
import RemoveUserDialog from '@/components/dialog/removeUserDialog';
import { getInstructors, removeUser } from '@/api/users';
import { Instructor } from '@/model/userModel';

interface instructorListProps extends HTMLAttributes<HTMLDivElement> {}

const InstructorListPage: FunctionComponent<instructorListProps> = () => {
  const id = useId();
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await getInstructors();
      const filterData = data.data.instructors.map((instructor) => ({
        id: instructor.id,
        kakaoMemberId: instructor.kakaoMemberId,
        name: instructor.name,
        createdAt: instructor.createdAt,
        profileImage: instructor.profileImage,
      }));

      setInstructors(filterData);
      setTotal(data.meta.total);
    })();
  }, []);

  // 사용자 내보내기
  function onSubmit(userId: string) {
    handleRemoveUser(userId);
  }

  const handleRemoveUser = async (userId: string) => {
    try {
      await removeUser(userId);
    } catch {}
  };

  return (
    <div className="mx-5 max-w-[846px] sm:mx-auto">
      <PageTitle>강사 목록</PageTitle>
      <div className="text-paragraph-tiny text-content-secondary">
        총 <span className="text-content-primary">{total}</span>명
      </div>

      {/* User card 구역 */}
      <div className="mt-4 grid grid-cols-1 gap-5">
        {instructors?.map((instructor, i) => (
          <UserCardWrapper key={id + i}>
            <UserCardLeft>
              <UserCardAvatar img={instructor.profileImage || ''} />
              <UserCardDetails
                name={instructor.name}
                subLabel="승인일"
                subText={new Date(instructor.createdAt).toLocaleDateString()}
              />
            </UserCardLeft>

            <UserCardRight>
              <RemoveUserDialog
                userId={instructor.kakaoMemberId}
                username={instructor.name}
                type="instructor"
                onSubmit={onSubmit}
              >
                <Button size="sm" className="w-full sm:w-auto">
                  내보내기
                </Button>
              </RemoveUserDialog>
            </UserCardRight>
          </UserCardWrapper>
        ))}
      </div>
    </div>
  );
};

export default InstructorListPage;
