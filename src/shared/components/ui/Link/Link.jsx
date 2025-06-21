import React from 'react';
import { cn } from '../../../utils/classNames.js';

export const Link = ({ 
  href, 
  children, 
  className = '', 
  target,
  rel,
  external = false,
  ...props 
}) => {
  // External link check
  const isExternal = external || href.startsWith('http');
  const externalProps = isExternal ? { 
    target: target || '_blank', 
    rel: rel || 'noopener noreferrer' 
  } : {};

  return (
    <a 
      href={href} 
      className={cn('transition-colors', className)}
      {...externalProps}
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;