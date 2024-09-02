import { HTMLAttributes } from 'react';

interface avatarProps extends HTMLAttributes<HTMLDivElement> {
  img?: string;
  title: string;
  desc?: string;
}

const Avatar = ({ img, title, desc }: avatarProps) => {
  return (
    <div className="group block flex-shrink-0">
      <div className="flex items-center">
        <div>
          <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="inline-block h-14 w-14 rounded-full"
          />
        </div>
        <div className="ml-3">
          <p className="text-label-large text-gray-900 group-hover:text-gray-700">{title}</p>
          {desc && <p className="text-paragraph-tiny text-gray-600 group-hover:text-gray-400">{desc}</p>}
        </div>
      </div>
    </div>
  );
};

export { Avatar };
