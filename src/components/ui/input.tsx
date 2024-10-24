import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  right?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, isError, right, ...props }, ref) => {
  return (
    <div className="relative flex items-center">
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-lg border border-border-primary bg-background px-3 py-1.5 text-sm font-medium text-content-primary ring-offset-background file:border-0 file:bg-transparent placeholder:text-content-tertiary focus-visible:border-secondary focus-visible:outline-none',
          isError ? 'border-system-error' : 'border-border-primary',
          props.disabled && 'bg-gray-100 text-gray-400 disabled:cursor-not-allowed',
          className,
        )}
        ref={ref}
        {...props}
      />
      {right && <div className="absolute right-0 flex items-center pr-3">{right}</div>}
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
