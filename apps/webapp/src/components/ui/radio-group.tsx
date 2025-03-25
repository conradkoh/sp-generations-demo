import * as React from 'react';
import { cn } from '@/lib/utils';

export interface RadioGroupProps<T extends string = string>
  extends React.HTMLAttributes<HTMLDivElement> {
  value: T;
  onValueChange: (value: T) => void;
}

export const RadioGroup = React.forwardRef(
  <T extends string = string>(
    { className, ...props }: RadioGroupProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return <div ref={ref} className={cn('space-y-2', className)} {...props} />;
  }
);

RadioGroup.displayName = 'RadioGroup';

export interface RadioGroupItemProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

export const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  RadioGroupItemProps
>(({ className, value, ...props }, ref) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        ref={ref}
        value={value}
        className={cn(
          'h-4 w-4 border-gray-300 text-blue-500 focus:ring-blue-500',
          className
        )}
        {...props}
      />
    </div>
  );
});

RadioGroupItem.displayName = 'RadioGroupItem';
