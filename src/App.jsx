import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
<div className="min-h-screen bg-gradient-to-br from-surface-900 to-surface-800">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastClassName="backdrop-blur-glass bg-surface-800/80 border border-surface-600"
          bodyClassName="text-surface-50"
          progressClassName="bg-primary"
        />
      </div>
    </Router>
  )
}

export default App