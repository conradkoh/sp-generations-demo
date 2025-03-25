import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          {
            'bg-blue-500 text-white hover:bg-blue-600': variant === 'default',
            'border border-gray-300 bg-transparent hover:bg-gray-50':
              variant === 'outline',
            'hover:bg-gray-100': variant === 'ghost',
          },
          {
            'h-10 px-4 py-2': size === 'default',
            'h-8 px-3': size === 'sm',
            'h-12 px-8': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
