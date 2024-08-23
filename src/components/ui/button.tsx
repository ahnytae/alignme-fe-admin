import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-[#F4F4F5] disabled:text-label-small disabled:text-[#A1A1AA]',
  {
    variants: {
      variant: {
        default: '',
        primary:
          'bg-brand-primary hover:bg-brand-primary/90 text-paragraph-small text-content-primary px-3 py-2',
        secondary:
          'text-paragraph-small bg-secondary hover:bg-secondary/90 text-core-white px-3 py-2',
        outline: 'text-content-primary text-label-small border border-border-primary px-3 py-2',
        light: 'bg-gray-500 hover:bg-gray-500/90 text-label-small text-gray-50 px-3 py-2',
        ghost: 'text-label-small text-core-white px-3 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** 좌측 아이콘 */
  startAdornment?: React.ReactElement;
  /** 우측 아이콘 */
  endAdornment?: React.ReactElement;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, variant, startAdornment, endAdornment, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, className }))} ref={ref} {...props}>
        {startAdornment && <span>{startAdornment}</span>}
        {children}
        {endAdornment && <span>{endAdornment}</span>}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
