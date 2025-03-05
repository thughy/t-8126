
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 25, 
        duration: 0.3 
      }}
      className="w-full min-h-[calc(100vh-4rem)]"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
