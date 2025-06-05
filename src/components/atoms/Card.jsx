import React from 'react';
      import { motion } from 'framer-motion';
      
      const Card = ({ children, className = '', whileHover, transition, ...props }) => {
        return (
          <motion.div
            className={`bg-surface-800/50 backdrop-blur-sm border border-surface-700 rounded-xl p-6 ${className}`}
            whileHover={whileHover}
            transition={transition}
            {...props}
          >
            {children}
          </motion.div>
        );
      };
      
      export default Card;