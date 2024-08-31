import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Props extends React.ComponentPropsWithoutRef<'button'> {}

const KaKaoButton = ({ children, className, ...props }: Props) => {
  return (
    <Button
      variant="custom"
      size="area"
      className={cn('w-[380px] gap-3 rounded-xl bg-[#FEE500] text-label-base text-[#191919]', className)}
      startAdornment={<img src={`${process.env.PUBLIC_URL}/assets/icon/kakao.svg`} alt="kakao symbol" />}
      {...props}
    >
      {children}
    </Button>
  );
};

export default KaKaoButton;
