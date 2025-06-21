import React from 'react';
import { NavLink } from 'react-router-dom';

export const Link = ({ 
  href, 
  children, 
  className = '', 
  target,
  rel,
  ...props 
}) => {
  // External link check
  const isExternal = href.startsWith('http');
  const externalProps = isExternal ? { 
    target: target || '_blank', 
    rel: rel || 'noopener noreferrer' 
  } : {};

  return (
    <NavLink
      to={href} 
      className={className}
      {...externalProps}
      {...props}
    >
      {children}
    </NavLink>
  );
};

export default Link;