import React from 'react';
import { cn } from '../../lib/utils';

const Switch = React.forwardRef(({ 
  className, 
  checked = false, 
  onCheckedChange, 
  disabled = false,
  ...props 
}, ref) => {
  const handleChange = (event) => {
    if (onCheckedChange) {
      onCheckedChange(event.target.checked);
    }
  };

  return (
    <label className={cn("relative inline-flex items-center cursor-pointer", disabled && "cursor-not-allowed opacity-50", className)}>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
      <div className={cn(
        "relative w-11 h-6 bg-gray-200 rounded-full transition-colors duration-200",
        "focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50",
        checked ? "bg-blue-600" : "bg-gray-200",
        disabled && "opacity-50"
      )}>
        <div className={cn(
          "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0"
        )} />
      </div>
    </label>
  );
});

Switch.displayName = "Switch";

export { Switch }; 