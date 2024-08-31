import { Button } from '@/components/ui/button';

interface Props {
  content?: string;
}

const KaKaoButton = ({ content = '카카오톡으로 시작하기' }: Props) => {
  return (
    <Button
      variant="custom"
      size="area"
      className="w-[380px] gap-3 rounded-xl bg-[#FEE500] text-label-base text-[#191919]"
      startAdornment={<img src={`${process.env.PUBLIC_URL}/assets/icon/kakao.svg`} alt="kakao symbol" />}
    >
      {content}
    </Button>
  );
};

export default KaKaoButton;
