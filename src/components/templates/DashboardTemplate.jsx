import React from 'react';
      import HeaderBrand from '../molecules/HeaderBrand';
      import SearchInput from '../molecules/SearchInput';
      import HeaderActionButton from '../molecules/HeaderActionButton';
      import SidebarNavigation from '../organisms/SidebarNavigation';
      import SettingsModal from '../organisms/SettingsModal';
      import Button from '../atoms/Button';
      import Icon from '../atoms/Icon';
      
      const DashboardTemplate = ({ 
        children, 
        sidebarOpen, 
        setSidebarOpen, 
        showAddModal, 
        setShowAddModal, 
        showSettings, 
        setShowSettings, 
        darkMode, 
        setDarkMode 
      }) => {
        return (
          <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
            <div className="bg-gradient-to-br from-surface-900 to-surface-800 min-h-screen noise-texture">
              {/* Header */}
              <header className="sticky top-0 z-40 backdrop-blur-glass bg-surface-800/80 border-b border-surface-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between h-16">
                    <HeaderBrand onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
                    {/* Search Bar - Placeholder */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                      <SearchInput placeholder="Search accounts - Coming soon" disabled />
                    </div>
      
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                      <HeaderActionButton
                        iconName="Plus"
                        label="Add Account"
                        onClick={() => setShowAddModal(true)}
                        className="hidden sm:flex"
                      />
                       <Button
                        onClick={() => setShowAddModal(true)}
                        className="flex sm:hidden p-2"
                        variant="primary"
                        icon={Icon}
                        iconProps={{name: "Plus"}}
                       >
                       </Button>
                      
                      <Button
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-2 rounded-lg hover:bg-surface-700 transition-colors focus-ring"
                        variant="ghost"
                      >
                        <Icon name="Settings" className="h-5 w-5 text-surface-300" />
                      </Button>
                    </div>
                  </div>
                </div>
              </header>
      
              <div className="flex">
                {/* Sidebar */}
                <SidebarNavigation isOpen={sidebarOpen} />
      
                {/* Main Content */}
                <main className="flex-1 min-h-screen lg:ml-0">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                  </div>
                </main>
              </div>
      
              {/* Settings Panel */}
              <SettingsModal
                show={showSettings}
                onClose={() => setShowSettings(false)}
                darkMode={darkMode}
                onToggleDarkMode={() => setDarkMode(!darkMode)}
              />
      
              {/* Mobile Sidebar Overlay */}
              {sidebarOpen && (
                <div
                  className="fixed inset-0 z-20 bg-black/50 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
              )}
            </div>
          </div>
        );
      };
      
      export default DashboardTemplate;