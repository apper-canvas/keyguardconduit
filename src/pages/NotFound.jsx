import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-900 to-surface-800 flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-8"
        >
          <ApperIcon name="ShieldX" className="h-12 w-12 text-white" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl font-bold text-surface-50 mb-4"
        >
          404
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-surface-300 mb-8"
        >
          Page not found - Your security is intact
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors focus-ring"
          >
            <ApperIcon name="ArrowLeft" className="h-4 w-4" />
            <span>Return to KeyGuard</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound