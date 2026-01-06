import * as React from 'react';

import { cn } from '@/app/utils/cn';

function Input({
                 className,
                 type,
                 ...props
               }) {
  return (
      <input
          type={type}
          data-slot="input"
          className={cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-gray-300 h-10 w-full min-w-0 rounded-md border-2 bg-white px-3 py-2 text-base shadow-sm transition-[color,box-shadow,border-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-blue-500 focus-visible:ring-blue-500/30 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
              className
          )}
          {...props} />
  );
}

export { Input }