import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const BackButton = ({ className, ...props }: BackButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className={cn(
        'absolute left-2 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#7D7A7A8C] opacity-55',
        className,
      )}
      {...props}
    >
      <ArrowLeft className="h-4 w-4 text-white" />
    </button>
  );
};

export { BackButton };
