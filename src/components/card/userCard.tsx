import React, { HTMLAttributes } from 'react';

// Wrapper 컴포넌트
interface UserCardWrapperProps extends HTMLAttributes<HTMLDivElement> {}

const UserCardWrapper: React.FC<UserCardWrapperProps> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className="flex flex-col gap-4 rounded-xl border border-border-primary p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      {children}
    </div>
  );
};

const UserCardLeft: React.FC<UserCardWrapperProps> = ({ children, ...props }) => {
  return <div className="flex items-center">{children}</div>;
};

// Avatar 컴포넌트
interface UserCardAvatarProps {
  img?: string;
}

const UserCardAvatar: React.FC<UserCardAvatarProps> = ({ img }) => {
  return (
    <img
      alt=""
      src={
        img ||
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
      className="inline-block h-14 w-14 rounded-full"
    />
  );
};

// Details 컴포넌트
interface UserCardDetailsProps {
  name: string;
  subText: string;
  subLabel: string;
  additionalInfo?: string;
}

const UserCardDetails: React.FC<UserCardDetailsProps> = ({ name, subText, subLabel, additionalInfo }) => {
  return (
    <div className="ml-3">
      <p className="text-label-base text-content-primary">{name}</p>
      {additionalInfo && <p className="mt-1 text-label-small text-content-tertiary">{additionalInfo}</p>}
      <p className="mt-1 text-paragraph-tiny text-content-tertiary">
        {subLabel} <span className="text-content-secondary">{subText}</span>
      </p>
    </div>
  );
};

// 오른쪽 영역 컴포넌트
interface UserCardRightProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const UserCardRight: React.FC<UserCardRightProps> = ({ children, onClick }) => {
  return (
    <div className="" onClick={onClick}>
      <div className="flex w-full gap-2">{children}</div>
    </div>
  );
};

// 조합된 UserCard 컴포넌트
interface UserCardProps extends HTMLAttributes<HTMLDivElement> {
  img?: string;
  name: string;
  subLabel: string;
  subText: string;
  right?: React.ReactNode;
}

// UserCard 컴포넌트 (rl)
const UserCard: React.FC<UserCardProps> = ({ img, name, subLabel, subText, right, ...props }) => {
  return (
    <UserCardWrapper {...props}>
      {/* <div className="group block flex-shrink-0"> */}
      <UserCardLeft>
        <UserCardAvatar img={img} />
        <UserCardDetails name={name} subLabel={subLabel} subText={subText} />
      </UserCardLeft>
      <UserCardRight>{right}</UserCardRight>
      {/* </div> */}
    </UserCardWrapper>
  );
};

export { UserCard, UserCardWrapper, UserCardAvatar, UserCardDetails, UserCardLeft, UserCardRight };
