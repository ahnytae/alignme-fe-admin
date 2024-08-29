import { Button } from './button';

export default function Header() {
  return (
    <header className="flex h-[72px] items-center justify-between bg-secondary px-20">
      <h1 className="font-sora text-[32.5px] text-background-secondary">ALIGN ME</h1>
      <Button className="gap-2 text-sm" variant="primary" size="sm">
        강사 가입하기
      </Button>
    </header>
  );
}
