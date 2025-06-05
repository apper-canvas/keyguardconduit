import React from 'react';
      import { motion } from 'framer-motion';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      import ProgressBar from '../atoms/ProgressBar';
      import Button from '../atoms/Button';
      
      const getServiceIcon = (serviceName) => {
        const iconMap = {
          'Google': 'Chrome',
          'Microsoft': 'WindowIcon',
          'GitHub': 'Github',
          'Discord': 'MessageCircle',
          'Dropbox': 'Droplet',
          'Facebook': 'Facebook',
          'Twitter': 'Twitter',
          'Instagram': 'Instagram',
          'LinkedIn': 'Linkedin',
          'Amazon': 'Package'
        };
        return iconMap[serviceName] || 'Shield';
      };
      
      const AccountCard = ({ 
        account, 
        code, 
        timeRemaining, 
        onCopy, 
        onEdit, 
        onDelete, 
        index 
      }) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative bg-surface-800/50 backdrop-blur-sm border border-surface-700 rounded-xl p-6 hover:shadow-glow transition-all duration-300"
          >
            {/* Service Icon and Name */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <Icon 
                  name={getServiceIcon(account.serviceName)} 
                  className="h-6 w-6 text-primary" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <Text type="h4" className="font-semibold text-surface-50 truncate">{account.serviceName}</Text>
                <Text type="p" className="text-sm text-surface-400 truncate">{account.accountName}</Text>
              </div>
            </div>
      
            {/* TOTP Code */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <Text type="span" className="text-xs text-surface-400 uppercase tracking-wider">Code</Text>
                <ProgressBar 
                  value={timeRemaining || 0} 
                  max={account.period} 
                  size={32}
                />
              </div>
              <div className="flex items-center space-x-3">
                <Text 
                  type="span" 
                  className={`font-mono text-2xl font-bold tracking-wider ${
                    (timeRemaining || 0) &lt;= 10 ? 'text-accent' : 'text-surface-50'
                  }`}
                >
                  {code || '------'}
                </Text>
                <Button
                  variant="ghost"
                  onClick={() => onCopy(code, account.serviceName)}
                  icon={Icon}
                  iconProps={{name: "Copy"}}
                  className="p-2 hover:bg-surface-700 rounded-lg transition-colors focus-ring"
                >
                  &lt;Icon name="Copy" className="h-4 w-4 text-surface-400" /&gt;
                </Button>
              </div>
            </div>
      
            {/* Action Buttons */}
            <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                onClick={() => onEdit(account)}
                icon={Icon}
                iconProps={{name: "Edit"}}
                className="p-2 hover:bg-surface-700 rounded-lg transition-colors focus-ring"
              >
                &lt;Icon name="Edit" className="h-4 w-4 text-surface-400" /&gt;
              </Button>
              <Button
                variant="ghost"
                onClick={() => onDelete(account)}
                icon={Icon}
                iconProps={{name: "Trash2"}}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors focus-ring"
              >
                &lt;Icon name="Trash2" className="h-4 w-4 text-red-400" /&gt;
              </Button>
            </div>
          </motion.div>
        );
      };
      
      export default AccountCard;