import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { accountService } from '../services'

const Home = () => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const loadAccounts = async () => {
      setLoading(true)
      try {
        const result = await accountService.getAll()
        setAccounts(result || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadAccounts()
  }, [])

  const handleAccountAdded = (newAccount) => {
    setAccounts(prev => [...prev, newAccount])
    setShowAddModal(false)
  }

  const handleAccountDeleted = (accountId) => {
    setAccounts(prev => prev.filter(acc => acc.id !== accountId))
  }

  const handleAccountUpdated = (updatedAccount) => {
    setAccounts(prev => prev.map(acc => 
      acc.id === updatedAccount.id ? updatedAccount : acc
    ))
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-surface-900 to-surface-800 min-h-screen noise-texture">
        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur-glass bg-surface-800/80 border-b border-surface-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo and Navigation */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-surface-700 transition-colors focus-ring"
                >
                  <ApperIcon name="Menu" className="h-5 w-5 text-surface-300" />
                </button>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <ApperIcon name="Shield" className="h-5 w-5 text-white" />
                  </div>
                  <h1 className="text-xl font-bold text-surface-50 hidden sm:block">
                    KeyGuard Pro
                  </h1>
                </div>
              </div>

              {/* Search Bar - Placeholder */}
              <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                  <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
                  <input
                    type="text"
                    placeholder="Search accounts - Coming soon"
                    disabled
                    className="w-full pl-10 pr-4 py-2 bg-surface-700/50 border border-surface-600 rounded-lg text-surface-300 placeholder-surface-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors focus-ring"
                >
                  <ApperIcon name="Plus" className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Account</span>
                </motion.button>
                
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 rounded-lg hover:bg-surface-700 transition-colors focus-ring"
                >
                  <ApperIcon name="Settings" className="h-5 w-5 text-surface-300" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <AnimatePresence>
            {(sidebarOpen || window.innerWidth >= 1024) && (
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
                      <div className="flex items-center space-x-3 px-3 py-2 bg-primary/20 text-primary rounded-lg">
                        <ApperIcon name="Grid3X3" className="h-4 w-4" />
                        <span className="text-sm font-medium">All Accounts</span>
                      </div>
                      <div className="flex items-center space-x-3 px-3 py-2 text-surface-400 rounded-lg cursor-not-allowed">
                        <ApperIcon name="Folder" className="h-4 w-4" />
                        <span className="text-sm">Categories</span>
                        <span className="text-xs text-surface-500 ml-auto">Soon</span>
                      </div>
                      <div className="flex items-center space-x-3 px-3 py-2 text-surface-400 rounded-lg cursor-not-allowed">
                        <ApperIcon name="History" className="h-4 w-4" />
                        <span className="text-sm">History</span>
                        <span className="text-xs text-surface-500 ml-auto">Soon</span>
                      </div>
                      <div className="flex items-center space-x-3 px-3 py-2 text-surface-400 rounded-lg cursor-not-allowed">
                        <ApperIcon name="Shield" className="h-4 w-4" />
                        <span className="text-sm">Security</span>
                        <span className="text-xs text-surface-500 ml-auto">Soon</span>
                      </div>
                    </div>
                  </div>
                </nav>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <main className="flex-1 min-h-screen lg:ml-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <MainFeature
                accounts={accounts}
                loading={loading}
                error={error}
                onAccountAdded={handleAccountAdded}
                onAccountDeleted={handleAccountDeleted}
                onAccountUpdated={handleAccountUpdated}
                showAddModal={showAddModal}
                setShowAddModal={setShowAddModal}
              />
            </div>
          </main>
        </div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setShowSettings(false)}
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md bg-surface-800 border border-surface-600 rounded-2xl p-6 glass-effect"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-surface-50">Settings</h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-2 hover:bg-surface-700 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" className="h-5 w-5 text-surface-400" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-surface-200">Dark Mode</label>
                      <p className="text-xs text-surface-400">Toggle dark theme</p>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-ring ${
                        darkMode ? 'bg-primary' : 'bg-surface-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-surface-200">Backup</span>
                      <span className="text-xs text-surface-500">Coming soon</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-surface-200">Auto-lock</span>
                      <span className="text-xs text-surface-500">Coming soon</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  )
}

export default Home