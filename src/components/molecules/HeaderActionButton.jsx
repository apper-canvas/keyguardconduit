import React from 'react';
      import Button from '../atoms/Button';
      import Icon from '../atoms/Icon';
      
      const HeaderActionButton = ({ iconName, label, onClick, variant = 'primary', className = '', ...props }) => {
        return (
          <Button 
            onClick={onClick} 
            className={`flex items-center space-x-2 ${className}`} 
            variant={variant} 
            {...props}
          >
            <Icon name={iconName} className="h-4 w-4" />
            <span className="hidden sm:inline">{label}</span>
          </Button>
        );
      };
      
      export default HeaderActionButton;