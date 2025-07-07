import React from 'react';
import cn from 'classnames';

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export default function Separator({
  orientation = 'horizontal',
  className = '',
}: SeparatorProps) {
  return (
    <div
      role="separator"
      className={cn(
        'bg-gray-300',
        orientation === 'horizontal' ? 'w-full h-px my-2' : 'w-px mx-2',
        className
      )}
    />
  );
}
