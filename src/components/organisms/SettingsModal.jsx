import React from 'react';
      import { motion } from 'framer-motion';
      import Modal from '../molecules/Modal';
      import ToggleSwitch from '../atoms/ToggleSwitch';
      import Text from '../atoms/Text';
      
      const SettingsModal = ({ show, onClose, darkMode, onToggleDarkMode }) => {
        return (
          <Modal show={show} onClose={onClose} title="Settings" className="max-w-md">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Text type="label" className="text-sm font-medium text-surface-200">Dark Mode</Text>
                  <Text type="p" className="text-xs text-surface-400">Toggle dark theme</Text>
                </div>
                <ToggleSwitch checked={darkMode} onChange={onToggleDarkMode} />
              </div>
      
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Text type="span" className="text-sm text-surface-200">Backup</Text>
                  <Text type="span" className="text-xs text-surface-500">Coming soon</Text>
                </div>
                <div className="flex items-center justify-between">
                  <Text type="span" className="text-sm text-surface-200">Auto-lock</Text>
                  <Text type="span" className="text-xs text-surface-500">Coming soon</Text>
                </div>
              </div>
            </div>
          </Modal>
        );
      };
      
      export default SettingsModal;