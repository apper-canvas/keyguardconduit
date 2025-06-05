import React from 'react';
      import { motion } from 'framer-motion';
      
      const LoadingSpinner = ({ className = "w-8 h-8 border-2 border-primary border-t-transparent rounded-full" }) => {
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className={className}
          />
        );
      };
      
      export default LoadingSpinner;