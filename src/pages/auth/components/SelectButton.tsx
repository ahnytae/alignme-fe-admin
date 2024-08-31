import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  isSelected?: boolean;
}

const SelectButton = forwardRef(
  ({ children, className, isSelected, ...props }: Props, ref: React.ForwardedRef<HTMLButtonElement>) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        startAdornment={
          <Check
            size="20px"
            className={`transition-colors ${isSelected ? 'text-brand-primary-200' : 'text-gray-300'}`}
          />
        }
        className={cn(
          'justify-start gap-2 rounded-xl px-4 py-3 text-label-base text-content-primary',
          `${isSelected ? 'border-content-secondary' : ''}`,
          className,
        )}
        {...props}
      >
        {children}
      </Button>
    );
  },
);

export default SelectButton;
