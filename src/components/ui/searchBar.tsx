import { Input } from './input';

interface SearchBarProps {
  placeholder: string;
  onSubmit: () => void;
}

const SearchBar = ({ placeholder, onSubmit }: SearchBarProps) => {
  return (
    <Input
      placeholder={placeholder}
      className="h-10 rounded-[12px] py-2"
      right={
        <img
          src="/assets/icon/search.svg"
          alt="search"
          className="w-5 h-5 text-gray-300"
          onClick={onSubmit}
        />
      }
    />
  );
};

export { SearchBar };
