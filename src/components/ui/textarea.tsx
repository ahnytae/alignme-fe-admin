import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, maxLength, ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          className={cn(
            'flex min-h-[220px] w-full text-content-primary text-base font-medium p-4 rounded-lg border border-border-primary bg-background ring-offset-background placeholder:text-base placeholder:text-content-tertiary placeholder:font-medium focus-visible:outline-none focus-visible:border-secondary disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        {maxLength && (
          <div className="absolute bottom-4 right-4 text-[12px] leading-[14px] font-medium text-content-tertiary">
            {props.value?.toString().length || 0}/{maxLength}
          </div>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
