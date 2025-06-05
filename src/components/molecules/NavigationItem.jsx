import React from 'react';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      import Badge from '../atoms/Badge';
      
      const NavigationItem = ({ iconName, label, active = false, comingSoon = false }) => {
        const baseClasses = "flex items-center space-x-3 px-3 py-2 rounded-lg";
        const activeClasses = active ? "bg-primary/20 text-primary" : "text-surface-400";
        const disabledClasses = comingSoon ? "cursor-not-allowed" : "";
      
        return (
          <div className={`${baseClasses} ${activeClasses} ${disabledClasses}`}>
            <Icon name={iconName} className="h-4 w-4" />
            <Text type="span" className="text-sm font-medium">{label}</Text>
            {comingSoon && &lt;Badge text="Soon" /&gt;}
          </div>
        );
      };
      
      export default NavigationItem;