import { Search } from 'lucide-react';
import * as React from 'react';

import { cn } from '~/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  className?: string;
  type?: string;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative">
        <Search className="absolute mt-2 ml-[9px] w-[17px]" />
        <input
          type={type}
          className={cn(
            'border border-input py-2 justify-between h-10 flex w-full px-8 rounded-md bg-background text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
InputWithIcon.displayName = 'InputWithIcon';

export { InputWithIcon };
