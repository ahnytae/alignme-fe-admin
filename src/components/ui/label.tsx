import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '../../lib/utils';

export interface LabelProps
  extends React.ComponentProps<typeof LabelPrimitive.Root> {
  isRequired?: boolean;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, isRequired, ...props }, ref) => (
  <>
    {isRequired && <span className="text-destructive mr-1">*</span>}
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        'text-sm font-semibold text-content-secondary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  </>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
