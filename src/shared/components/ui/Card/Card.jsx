import React from 'react';
import { cn } from '../../../utils/classNames.js';

export const Card = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  hover = false,
  ...props
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const classes = cn(
    'bg-white rounded-lg border border-gray-100',
    paddingClasses[padding],
    shadowClasses[shadow],
    hover && 'hover:shadow-lg transition-shadow duration-300',
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={cn('mb-4', className)}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={cn('text-lg font-semibold text-gray-900', className)}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={cn('text-gray-600', className)}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={cn('mt-4 pt-4 border-t border-gray-100', className)}>
    {children}
  </div>
);

export default Card;