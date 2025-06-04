import React from 'react';
import { cn } from '../../lib/utils';

const Slider = React.forwardRef(({ 
  className, 
  value = [0], 
  onValueChange, 
  min = 0, 
  max = 100, 
  step = 1, 
  disabled = false,
  ...props 
}, ref) => {
  const handleChange = (event) => {
    const newValue = parseFloat(event.target.value);
    if (onValueChange) {
      onValueChange([newValue]);
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0] || 0}
        onChange={handleChange}
        disabled={disabled}
        className={cn(
          "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4",
          "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600",
          "[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-0",
          "[&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:hover:bg-blue-700",
          "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full",
          "[&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:cursor-pointer",
          "[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md",
          "[&::-moz-range-track]:bg-gray-200 [&::-moz-range-track]:rounded-lg [&::-moz-range-track]:h-2"
        )}
        {...props}
      />
    </div>
  );
});

Slider.displayName = "Slider";

export { Slider }; 