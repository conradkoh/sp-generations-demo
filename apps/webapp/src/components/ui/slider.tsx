import * as React from 'react';
import { cn } from '@/lib/utils';

interface SliderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
  > {
  value: number[];
  onValueChange: (value: number[]) => void;
  min: number;
  max: number;
  step?: number;
  className?: string;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, onValueChange, min, max, step = 1, ...props }, ref) => {
    const percentage = ((value[0] - min) / (max - min)) * 100;

    return (
      <div className={cn('relative w-full h-6 flex items-center', className)}>
        <div className="absolute w-full h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-full bg-blue-500 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => onValueChange([Number(e.target.value)])}
          className="absolute w-full h-2 opacity-0 cursor-pointer"
          {...props}
        />
      </div>
    );
  }
);

Slider.displayName = 'Slider';
