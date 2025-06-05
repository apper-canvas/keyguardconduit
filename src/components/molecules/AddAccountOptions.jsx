import React from 'react';
      import { motion } from 'framer-motion';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      
      const OptionButton = ({ iconName, iconColorClass, title, description, onClick }) => (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClick}
          className="w-full flex items-center space-x-4 p-4 bg-surface-700/50 hover:bg-surface-700 rounded-xl transition-colors focus-ring"
        >
          <div className={`w-12 h-12 ${iconColorClass} rounded-lg flex items-center justify-center`}>
            <Icon name={iconName} className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <Text type="h4" className="font-medium text-surface-50">{title}</Text>
            <Text type="p" className="text-sm text-surface-400">{description}</Text>
          </div>
        </motion.button>
      );
      
      const AddAccountOptions = ({ onScanQR, onManualEntry }) => {
        return (
          &lt;&gt;
            <div className="text-center mb-6">
              <Text type="h3" className="text-xl font-semibold text-surface-50 mb-2">Add Account</Text>
              <Text type="p" className="text-surface-400">Choose how to add your 2FA account</Text>
            </div>
            
            <div className="space-y-4">
              <OptionButton
                iconName="QrCode"
                iconColorClass="bg-primary/20"
                title="Scan QR Code"
                description="Use your camera to scan"
                onClick={onScanQR}
              />
              
              <OptionButton
                iconName="Keyboard"
                iconColorClass="bg-secondary/20"
                title="Enter Manually"
                description="Type the secret key"
                onClick={onManualEntry}
              />
            </div>
          &lt;/&gt;
        );
      };
      
      export default AddAccountOptions;