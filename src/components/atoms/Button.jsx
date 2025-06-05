import React from 'react';
      import { motion } from 'framer-motion';
      
      const Button = ({ children, onClick, className = '', icon: IconComponent, variant = 'primary', ...props }) => {
        const baseClasses = "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors focus-ring";
        let variantClasses = "";
      
        switch (variant) {
          case 'primary':
            variantClasses = "bg-primary hover:bg-primary-dark text-white";
            break;
          case 'secondary':
            variantClasses = "bg-surface-700 hover:bg-surface-600 text-surface-200";
            break;
          case 'danger':
            variantClasses = "bg-red-600 hover:bg-red-700 text-white";
            break;
          case 'ghost':
            variantClasses = "p-2 hover:bg-surface-700 text-surface-300";
            break;
          case 'text':
            variantClasses = "py-2 text-sm text-primary hover:text-primary-light";
            break;
          default:
            variantClasses = "bg-primary hover:bg-primary-dark text-white";
        }
      
        return (
          <motion.button
            whileHover={{ scale: (variant === 'ghost' || variant === 'text') ? 1.1 : 1.05 }}
            whileTap={{ scale: (variant === 'ghost' || variant === 'text') ? 0.9 : 0.95 }}
            onClick={onClick}
            className={`${baseClasses} ${variantClasses} ${className}`}
            {...props}
          >
            {IconComponent && &lt;IconComponent className="h-4 w-4" /&gt;}
            {children}
          </motion.button>
        );
      };
      
      export default Button;