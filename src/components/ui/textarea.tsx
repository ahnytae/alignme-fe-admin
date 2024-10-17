import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, maxLength, ...props }, ref) => {
  return (
    <div className="relative">
      <textarea
        className={cn(
          'flex min-h-[220px] w-full rounded-lg border border-border-primary bg-background p-4 text-base font-medium text-content-primary ring-offset-background placeholder:text-base placeholder:font-medium placeholder:text-content-tertiary focus-visible:border-secondary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
      {maxLength && (
        <div className="absolute bottom-4 right-4 text-[12px] font-medium leading-[14px] text-content-tertiary">
          {props.value?.toString().length || 0}/{maxLength}
        </div>
      )}
    </div>
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
