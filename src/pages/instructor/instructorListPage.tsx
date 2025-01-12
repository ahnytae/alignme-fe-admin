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
import { Instructor } from '@/model/userModel';
import { getInstructors, removeUser } from '@/api/users';
import { toast } from 'react-toastify';

interface instructorListProps extends HTMLAttributes<HTMLDivElement> {}

const InstructorListPage: FunctionComponent<instructorListProps> = () => {
  const id = useId();
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [total, setTotal] = useState(0);

  async function fetchInstructors() {
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
  }

  useEffect(() => {
    fetchInstructors();
  }, []);

  // 사용자 내보내기
  async function onSubmit(userId: string) {
    await handleRemoveUser(userId);
    await fetchInstructors();
  }

  const handleRemoveUser = async (userId: string) => {
    try {
      await removeUser(userId);
      toast.success('강사를 내보냈습니다');
    } catch {
      toast.success('강사 내보내기에 실패했습니다');
    }
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
