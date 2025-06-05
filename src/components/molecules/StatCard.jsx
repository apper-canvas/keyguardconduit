import React from 'react';
      import Card from '../atoms/Card';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      
      const StatCard = ({ iconName, iconBgClass, label, value }) => {
        return (
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${iconBgClass} rounded-lg flex items-center justify-center`}>
                <Icon name={iconName} className="h-5 w-5 text-white" />
              </div>
              <div>
                <Text type="p" className="text-sm text-surface-400">{label}</Text>
                <Text type="p" className="text-2xl font-bold text-surface-50">{value}</Text>
              </div>
            </div>
          </Card>
        );
      };
      
      export default StatCard;