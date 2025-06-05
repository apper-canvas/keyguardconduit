import React from 'react';
      
      const Badge = ({ text, className = '' }) => (
        <span className={`text-xs text-surface-500 ml-auto ${className}`}>{text}</span>
      );
      
      export default Badge;