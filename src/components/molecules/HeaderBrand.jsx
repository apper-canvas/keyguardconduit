import React from 'react';
      import Button from '../atoms/Button';
      import Logo from '../atoms/Logo';
      import Icon from '../atoms/Icon';
      
      const HeaderBrand = ({ onMenuClick }) => {
        return (
          <div className="flex items-center space-x-4">
            <Button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-700 transition-colors focus-ring"
              variant="ghost"
            >
              <Icon name="Menu" className="h-5 w-5 text-surface-300" />
            </Button>
            <Logo />
          </div>
        );
      };
      
      export default HeaderBrand;