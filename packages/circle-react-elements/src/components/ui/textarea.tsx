import React from 'react';
import { FieldError } from 'react-hook-form';

import { cn } from '~/lib/utils';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  className?: string;
  type?: string;
  error?: FieldError;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          error ? 'border-destructive' : '',
          className,
        )}
        ref={ref}
        aria-invalid={error ? 'true' : 'false'}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
