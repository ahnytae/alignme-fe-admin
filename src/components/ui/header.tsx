import { Button } from "./button";

export default function Header() {
  return (
    <header className="h-[72px] bg-secondary flex items-center justify-between px-20">
      <h1 className="text-background-secondary font-sora text-[32.5px]">
        ALIGN ME
      </h1>
      <Button className="gap-2 text-sm" variant="primary" size="sm">
        강사 가입하기
      </Button>
    </header>
  );
}
