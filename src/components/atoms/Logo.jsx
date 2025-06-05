import React from 'react';
      import Icon from './Icon';
      
      const Logo = ({ className = '', iconClassName = '' }) => {
        return (
          <div className={`flex items-center space-x-3 ${className}`}>
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Shield" className={`h-5 w-5 text-white ${iconClassName}`} />
            </div>
            <h1 className="text-xl font-bold text-surface-50 hidden sm:block">
              KeyGuard Pro
            </h1>
          </div>
        );
      };
      
      export default Logo;