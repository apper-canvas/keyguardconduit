import React from 'react';
      import { motion, AnimatePresence } from 'framer-motion';
      import NavigationItem from '../molecules/NavigationItem';
      
      const SidebarNavigation = ({ isOpen }) => {
        return (
          <AnimatePresence>
            {(isOpen || window.innerWidth >= 1024) && (
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 20 }}
                className="fixed lg:sticky top-16 left-0 z-30 w-64 h-screen bg-surface-800/90 backdrop-blur-glass border-r border-surface-700 lg:bg-transparent lg:backdrop-blur-none"
              >
                <nav className="p-4 space-y-2">
                  <div className="mb-6">
                    <h2 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3">
                      Navigation
                    </h2>
                    <div className="space-y-1">
                      <NavigationItem iconName="Grid3X3" label="All Accounts" active />
                      <NavigationItem iconName="Folder" label="Categories" comingSoon />
                      <NavigationItem iconName="History" label="History" comingSoon />
                      <NavigationItem iconName="Shield" label="Security" comingSoon />
                    </div>
                  </div>
                </nav>
              </motion.aside>
            )}
          </AnimatePresence>
        );
      };
      
      export default SidebarNavigation;