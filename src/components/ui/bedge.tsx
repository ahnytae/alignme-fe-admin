import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const bedgeVariants = cva('inline-flex items-center rounded-md px-1.5 py-0.5 text-sm font-semibold', {
  variants: {
    variant: {
      green: 'bg-[#8BC34A14] opacity-80 text-[##8BC34A]',
      red: 'bg-[#FF572214] opacity-80 text-[#FF5722]',
      yellow: 'bg-[#FFC10714] opacity-80 text-[#FFC107]',
    },
  },
  defaultVariants: {
    variant: 'green',
  },
});

interface BedgeProps extends VariantProps<typeof bedgeVariants>, React.HTMLAttributes<HTMLSpanElement> {
  color?: string;
}

const Bedge = ({ variant, className, children }: BedgeProps) => {
  return <span className={cn(bedgeVariants({ variant, className }))}>{children}</span>;
};
Bedge.displayName = 'Bedge';

export { Bedge };
