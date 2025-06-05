import React from 'react';
      import { motion, AnimatePresence } from 'framer-motion';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      
      const Modal = ({ 
        show, 
        onClose, 
        title, 
        children, 
        className = '', 
        showCloseButton = true, 
        titleCentered = false 
      }) => {
        return (
          <AnimatePresence>
            {show && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={onClose}
              >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className={`relative w-full max-w-md bg-surface-800 border border-surface-600 rounded-2xl p-6 glass-effect ${className}`}
                >
                  <div className={`flex items-center ${titleCentered ? 'justify-center' : 'justify-between'} mb-6`}>
                    {title && &lt;Text type="h3" className={`font-semibold text-surface-50 ${titleCentered ? 'text-xl' : 'text-lg'}`}&gt;{title}&lt;/Text&gt;}
                    {showCloseButton && (
                      <button
                        onClick={onClose}
                        className="p-2 hover:bg-surface-700 rounded-lg transition-colors"
                      >
                        <Icon name="X" className="h-5 w-5 text-surface-400" />
                      </button>
                    )}
                  </div>
                  {children}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      };
      
      export default Modal;