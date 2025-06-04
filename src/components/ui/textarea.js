import React from 'react';
import { cn } from '../../lib/utils';

const Textarea = React.forwardRef(({ 
  className, 
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
        "ring-offset-white placeholder:text-gray-500",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400",
        "dark:ring-offset-gray-900 dark:focus-visible:ring-blue-300",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea }; 