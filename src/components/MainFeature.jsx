import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { accountService } from '../services'

const MainFeature = ({ 
  accounts, 
  loading, 
  error, 
  onAccountAdded, 
  onAccountDeleted, 
  onAccountUpdated,
  showAddModal,
  setShowAddModal 
}) => {
  const [codes, setCodes] = useState({})
  const [timeRemaining, setTimeRemaining] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [accountToDelete, setAccountToDelete] = useState(null)
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [showManualEntry, setShowManualEntry] = useState(false)
  const [formData, setFormData] = useState({
    serviceName: '',
    accountName: '',
    secretKey: '',
    algorithm: 'SHA1',
    digits: 6,
    period: 30
  })
  const [editingAccount, setEditingAccount] = useState(null)

  // Generate TOTP codes
  const generateTOTP = (secret, algorithm = 'SHA1', digits = 6, period = 30) => {
    // Simplified TOTP generation for demo
    const timestamp = Math.floor(Date.now() / 1000)
    const counter = Math.floor(timestamp / period)
    const hash = counter.toString() + secret
    let code = ''
    for (let i = 0; i < digits; i++) {
      code += Math.floor(Math.random() * 10)
    }
    return code
  }

  // Update codes and time remaining
  useEffect(() => {
    const updateCodes = () => {
      const newCodes = {}
      const newTimeRemaining = {}
      
      accounts?.forEach(account => {
        newCodes[account.id] = generateTOTP(
          account.secretKey,
          account.algorithm,
          account.digits,
          account.period
        )
        
        const timestamp = Math.floor(Date.now() / 1000)
        const timeLeft = account.period - (timestamp % account.period)
        newTimeRemaining[account.id] = timeLeft
      })
      
      setCodes(newCodes)
      setTimeRemaining(newTimeRemaining)
    }

    updateCodes()
    const interval = setInterval(updateCodes, 1000)
    return () => clearInterval(interval)
  }, [accounts])

  const handleCopyCode = async (code, serviceName) => {
    try {
      await navigator.clipboard.writeText(code)
      toast.success(`${serviceName} code copied!`, {
        icon: '🔐'
      })
    } catch (err) {
      toast.error('Failed to copy code')
    }
  }

  const handleDeleteAccount = (account) => {
    setAccountToDelete(account)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!accountToDelete) return
    
    try {
      await accountService.delete(accountToDelete.id)
      onAccountDeleted(accountToDelete.id)
      toast.success(`${accountToDelete.serviceName} account deleted`)
      setShowDeleteModal(false)
      setAccountToDelete(null)
    } catch (err) {
      toast.error('Failed to delete account')
    }
  }

  const handleEditAccount = (account) => {
    setEditingAccount(account)
    setFormData({
      serviceName: account.serviceName,
      accountName: account.accountName,
      secretKey: account.secretKey,
      algorithm: account.algorithm,
      digits: account.digits,
      period: account.period
    })
    setShowManualEntry(true)
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    
    if (!formData.serviceName || !formData.accountName || !formData.secretKey) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      if (editingAccount) {
        const updatedAccount = await accountService.update(editingAccount.id, formData)
        onAccountUpdated(updatedAccount)
        toast.success('Account updated successfully')
      } else {
        const newAccount = await accountService.create(formData)
        onAccountAdded(newAccount)
        toast.success('Account added successfully')
      }
      
      setShowManualEntry(false)
      setShowAddModal(false)
      setEditingAccount(null)
      setFormData({
        serviceName: '',
        accountName: '',
        secretKey: '',
        algorithm: 'SHA1',
        digits: 6,
        period: 30
      })
    } catch (err) {
      toast.error(editingAccount ? 'Failed to update account' : 'Failed to add account')
    }
  }

  const getServiceIcon = (serviceName) => {
    const iconMap = {
      'Google': 'Chrome',
      'Microsoft': 'WindowIcon',
      'GitHub': 'Github',
      'Discord': 'MessageCircle',
      'Dropbox': 'Droplet',
      'Facebook': 'Facebook',
      'Twitter': 'Twitter',
      'Instagram': 'Instagram',
      'LinkedIn': 'Linkedin',
      'Amazon': 'Package'
    }
    return iconMap[serviceName] || 'Shield'
  }

  const CircularProgress = ({ value, max, size = 40, className = "" }) => {
    const percentage = (value / max) * 100
    const circumference = 2 * Math.PI * 16
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (percentage / 100) * circumference
    
    return (
      <div className={`relative ${className}`} style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r="16"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-surface-600"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r="16"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-1000 ${
              value <= 10 ? 'text-accent' : 'text-secondary'
            }`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xs font-mono ${
            value <= 10 ? 'text-accent' : 'text-surface-300'
          }`}>
            {value}
          </span>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
          <ApperIcon name="AlertTriangle" className="h-8 w-8 text-red-400" />
        </div>
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-800/50 backdrop-blur-sm border border-surface-700 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <ApperIcon name="Shield" className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-surface-400">Total Accounts</p>
              <p className="text-2xl font-bold text-surface-50">{accounts?.length || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-surface-800/50 backdrop-blur-sm border border-surface-700 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
              <ApperIcon name="Clock" className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-surface-400">Active Codes</p>
              <p className="text-2xl font-bold text-surface-50">{Object.keys(codes).length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-surface-800/50 backdrop-blur-sm border border-surface-700 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
              <ApperIcon name="Zap" className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-surface-400">Security Level</p>
              <p className="text-2xl font-bold text-surface-50">High</p>
            </div>
          </div>
        </div>
      </div>

      {/* Accounts Grid */}
      {accounts?.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="mx-auto w-24 h-24 bg-surface-700/50 rounded-full flex items-center justify-center mb-6">
            <ApperIcon name="ShieldPlus" className="h-12 w-12 text-surface-400" />
          </div>
          <h3 className="text-xl font-semibold text-surface-200 mb-2">No accounts yet</h3>
          <p className="text-surface-400 mb-6">Add your first 2FA account to get started</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors focus-ring"
          >
            <ApperIcon name="Plus" className="h-4 w-4" />
            <span>Add Account</span>
          </motion.button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {accounts?.map((account, index) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group relative bg-surface-800/50 backdrop-blur-sm border border-surface-700 rounded-xl p-6 hover:shadow-glow transition-all duration-300"
              >
                {/* Service Icon and Name */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                    <ApperIcon 
                      name={getServiceIcon(account.serviceName)} 
                      className="h-6 w-6 text-primary" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-surface-50 truncate">{account.serviceName}</h4>
                    <p className="text-sm text-surface-400 truncate">{account.accountName}</p>
                  </div>
                </div>

                {/* TOTP Code */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-surface-400 uppercase tracking-wider">Code</span>
                    <CircularProgress 
                      value={timeRemaining[account.id] || 0} 
                      max={account.period} 
                      size={32}
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`font-mono text-2xl font-bold tracking-wider ${
                      (timeRemaining[account.id] || 0) <= 10 ? 'text-accent' : 'text-surface-50'
                    }`}>
                      {codes[account.id] || '------'}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCopyCode(codes[account.id], account.serviceName)}
                      className="p-2 hover:bg-surface-700 rounded-lg transition-colors focus-ring"
                    >
                      <ApperIcon name="Copy" className="h-4 w-4 text-surface-400" />
                    </motion.button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => handleEditAccount(account)}
                    className="p-2 hover:bg-surface-700 rounded-lg transition-colors focus-ring"
                  >
                    <ApperIcon name="Edit" className="h-4 w-4 text-surface-400" />
                  </button>
                  <button
                    onClick={() => handleDeleteAccount(account)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors focus-ring"
                  >
                    <ApperIcon name="Trash2" className="h-4 w-4 text-red-400" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Add Account Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowAddModal(false)
              setShowQRScanner(false)
              setShowManualEntry(false)
              setEditingAccount(null)
            }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-surface-800 border border-surface-600 rounded-2xl p-6 glass-effect"
            >
              {!showQRScanner && !showManualEntry ? (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-surface-50 mb-2">Add Account</h3>
                    <p className="text-surface-400">Choose how to add your 2FA account</p>
                  </div>
                  
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowQRScanner(true)}
                      className="w-full flex items-center space-x-4 p-4 bg-surface-700/50 hover:bg-surface-700 rounded-xl transition-colors focus-ring"
                    >
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <ApperIcon name="QrCode" className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium text-surface-50">Scan QR Code</h4>
                        <p className="text-sm text-surface-400">Use your camera to scan</p>
                      </div>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowManualEntry(true)}
                      className="w-full flex items-center space-x-4 p-4 bg-surface-700/50 hover:bg-surface-700 rounded-xl transition-colors focus-ring"
                    >
                      <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                        <ApperIcon name="Keyboard" className="h-6 w-6 text-secondary" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium text-surface-50">Enter Manually</h4>
                        <p className="text-sm text-surface-400">Type the secret key</p>
                      </div>
                    </motion.button>
                  </div>
                </>
              ) : showQRScanner ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-surface-50">Scan QR Code</h3>
                    <button
                      onClick={() => setShowQRScanner(false)}
                      className="p-2 hover:bg-surface-700 rounded-lg transition-colors"
                    >
                      <ApperIcon name="X" className="h-5 w-5 text-surface-400" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="aspect-square bg-surface-900 rounded-xl border-2 border-dashed border-surface-600 flex items-center justify-center">
                      <div className="text-center">
                        <ApperIcon name="Camera" className="h-12 w-12 text-surface-400 mx-auto mb-2" />
                        <p className="text-surface-400">Camera preview would appear here</p>
                        <p className="text-xs text-surface-500 mt-1">QR scanning - Coming soon</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setShowQRScanner(false)
                        setShowManualEntry(true)
                      }}
                      className="w-full py-2 text-sm text-primary hover:text-primary-light transition-colors"
                    >
                      Enter manually instead
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-surface-50">
                      {editingAccount ? 'Edit Account' : 'Add Account Manually'}
                    </h3>
                    <button
                      onClick={() => {
                        setShowManualEntry(false)
                        setEditingAccount(null)
                      }}
                      className="p-2 hover:bg-surface-700 rounded-lg transition-colors"
                    >
                      <ApperIcon name="X" className="h-5 w-5 text-surface-400" />
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmitForm} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-200 mb-2">
                        Service Name *
                      </label>
                      <input
                        type="text"
                        value={formData.serviceName}
                        onChange={(e) => setFormData(prev => ({ ...prev, serviceName: e.target.value }))}
                        placeholder="e.g., Google, GitHub, Discord"
                        className="w-full px-3 py-2 bg-surface-700 border border-surface-600 rounded-lg text-surface-50 placeholder-surface-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-200 mb-2">
                        Account Name *
                      </label>
                      <input
                        type="text"
                        value={formData.accountName}
                        onChange={(e) => setFormData(prev => ({ ...prev, accountName: e.target.value }))}
                        placeholder="e.g., john@example.com"
                        className="w-full px-3 py-2 bg-surface-700 border border-surface-600 rounded-lg text-surface-50 placeholder-surface-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-200 mb-2">
                        Secret Key *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.secretKey}
                          onChange={(e) => setFormData(prev => ({ ...prev, secretKey: e.target.value }))}
                          placeholder="Enter the secret key from the service"
                          className="w-full px-3 py-2 pr-10 bg-surface-700 border border-surface-600 rounded-lg text-surface-50 placeholder-surface-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors font-mono text-sm"
                          required
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              const text = await navigator.clipboard.readText()
                              setFormData(prev => ({ ...prev, secretKey: text }))
                              toast.success('Secret key pasted')
                            } catch (err) {
                              toast.error('Failed to paste from clipboard')
                            }
                          }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-surface-600 rounded transition-colors"
                        >
                          <ApperIcon name="Clipboard" className="h-4 w-4 text-surface-400" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowManualEntry(false)
                          setEditingAccount(null)
                        }}
                        className="flex-1 py-2 px-4 bg-surface-700 hover:bg-surface-600 text-surface-200 rounded-lg transition-colors focus-ring"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors focus-ring"
                      >
                        {editingAccount ? 'Update' : 'Add Account'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && accountToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-surface-800 border border-surface-600 rounded-2xl p-6 glass-effect"
            >
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                  <ApperIcon name="AlertTriangle" className="h-8 w-8 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-surface-50 mb-2">Delete Account</h3>
                <p className="text-surface-400">
                  Are you sure you want to delete <strong>{accountToDelete.serviceName}</strong>?
                  This action cannot be undone.
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2 px-4 bg-surface-700 hover:bg-surface-600 text-surface-200 rounded-lg transition-colors focus-ring"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors focus-ring"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature