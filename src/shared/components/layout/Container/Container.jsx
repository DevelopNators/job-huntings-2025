import React from 'react';
import { cn } from '../../../utils/classNames.js';

export const Container = ({
  children,
  size = 'default',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'max-w-3xl',
    default: 'max-w-6xl',
    lg: 'max-w-7xl',
    xl: 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  const classes = cn(
    'mx-auto px-4 sm:px-6 lg:px-8',
    sizeClasses[size],
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Container;