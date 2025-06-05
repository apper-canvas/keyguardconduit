import React, { useState, useEffect } from 'react';
      import { toast } from 'react-toastify';
      import { AnimatePresence, motion } from 'framer-motion';
      import AccountCard from '../molecules/AccountCard';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      import Button from '../atoms/Button';
      
      const AccountGrid = ({ 
        accounts, 
        onAccountDeleted, 
        onAccountUpdated, 
        setShowAddModal,
        onEditAccount,
        onDeleteAccount 
      }) => {
        const [codes, setCodes] = useState({});
        const [timeRemaining, setTimeRemaining] = useState({});
      
        // Simplified TOTP generation for demo
        const generateTOTP = (secret, algorithm = 'SHA1', digits = 6, period = 30) => {
          const timestamp = Math.floor(Date.now() / 1000);
          const counter = Math.floor(timestamp / period);
          const hash = counter.toString() + secret;
          let code = '';
          for (let i = 0; i &lt; digits; i++) {
            code += Math.floor(Math.random() * 10);
          }
          return code;
        };
      
        // Update codes and time remaining
        useEffect(() => {
          const updateCodes = () => {
            const newCodes = {};
            const newTimeRemaining = {};
            
            accounts?.forEach(account => {
              newCodes[account.id] = generateTOTP(
                account.secretKey,
                account.algorithm,
                account.digits,
                account.period
              );
              
              const timestamp = Math.floor(Date.now() / 1000);
              const timeLeft = account.period - (timestamp % account.period);
              newTimeRemaining[account.id] = timeLeft;
            });
            
            setCodes(newCodes);
            setTimeRemaining(newTimeRemaining);
          };
      
          updateCodes();
          const interval = setInterval(updateCodes, 1000);
          return () => clearInterval(interval);
        }, [accounts]);
      
        const handleCopyCode = async (code, serviceName) => {
          try {
            await navigator.clipboard.writeText(code);
            toast.success(`${serviceName} code copied!`, {
              icon: '🔐'
            });
          } catch (err) {
            toast.error('Failed to copy code');
          }
        };
      
        if (accounts?.length === 0) {
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="mx-auto w-24 h-24 bg-surface-700/50 rounded-full flex items-center justify-center mb-6">
                <Icon name="ShieldPlus" className="h-12 w-12 text-surface-400" />
              </div>
              <Text type="h3" className="text-xl font-semibold text-surface-200 mb-2">No accounts yet</Text>
              <Text type="p" className="text-surface-400 mb-6">Add your first 2FA account to get started</Text>
              <Button
                onClick={() => setShowAddModal(true)}
                icon={Icon}
                iconProps={{name: "Plus"}}
                label="Add Account"
              >
                &lt;Icon name="Plus" className="h-4 w-4" /&gt;
                &lt;span&gt;Add Account&lt;/span&gt;
              </Button>
            </motion.div>
          );
        }
      
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {accounts?.map((account, index) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  code={codes[account.id]}
                  timeRemaining={timeRemaining[account.id]}
                  onCopy={handleCopyCode}
                  onEdit={onEditAccount}
                  onDelete={onDeleteAccount}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>
        );
      };
      
      export default AccountGrid;