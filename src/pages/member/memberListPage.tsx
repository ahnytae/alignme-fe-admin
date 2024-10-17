import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import {
  UserCardWrapper,
  UserCardAvatar,
  UserCardLeft,
  UserCardRight,
  UserCardDetails,
} from '@/components/card/userCard';
import PageTitle from '@/components/PageTitle';
import { Button } from '@/components/ui/button';
import InstructorChangeDialog from './components/InstructorChangeDialog';
import RemoveUserDialog from '@/components/dialog/removeUserDialog';
import { getInstructors, getMembers, removeUser } from '@/api/users';
import { Instructor, InstructorOnUser } from '@/model/userModel';

interface MemberListProps extends HTMLAttributes<HTMLDivElement> {}

export type ChangeInstrucrtors = Pick<Instructor, 'id' | 'name' | 'profileImage'>;

const MemberListPage: FunctionComponent<MemberListProps> = () => {
  const [users, setUsers] = useState<InstructorOnUser[]>([]);
  const [total, setTotal] = useState(0);

  const [instructors, setInstructors] = useState<ChangeInstrucrtors[]>([]);

  async function fetchInstroctors() {
    const { data } = await getInstructors();
    const filterData = data.data.instructors.map((instructor: Instructor) => ({
      id: instructor.id,
      name: instructor.name,
      profileImage: instructor.profileImage,
    }));

    setInstructors(filterData);
  }

  async function fetchMembers() {
    const { data } = await getMembers();
    setUsers(data.data.users);
    setTotal(data.meta.total);
  }

  useEffect(() => {
    fetchMembers();
    fetchInstroctors();
  }, []);

  if (!users) return <div>Loading...</div>;

  // 사용자 내보내기
  function onSubmit(userId: string) {
    handleRemoveUser(userId);
  }

  const handleRemoveUser = (userId: string) => {
    try {
      removeUser(userId);
      fetchMembers();
    } catch {}
  };

  return (
    <div className="mx-5 max-w-[846px] sm:mx-auto">
      <PageTitle>회원 목록</PageTitle>
      <div className="text-paragraph-tiny text-content-secondary">
        총 <span className="text-content-primary">{total}</span>명
      </div>

      {/* User card 구역 */}
      <div className="mt-4 grid grid-cols-1 gap-5">
        {users.map((user: InstructorOnUser, i: number) => (
          <UserCardWrapper key={user.id + i}>
            <UserCardLeft>
              <UserCardAvatar img={''} />
              <UserCardDetails
                name={user.name}
                subLabel="승인일"
                subText={new Date(user.createdAt).toLocaleDateString()}
                additionalInfo={`${user.instructor.name} 강사님`}
              />
            </UserCardLeft>
            {/* role = manager만 (추후 처리) */}
            <UserCardRight>
              <InstructorChangeDialog instructors={instructors} selecteMemberId={user.id}>
                <Button size="sm" variant="outline" className="w-full sm:w-auto">
                  소속강사 변경
                </Button>
              </InstructorChangeDialog>
              <RemoveUserDialog userId={user.kakaoMemberId} username={user.name} type="member" onSubmit={onSubmit}>
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

export default MemberListPage;
