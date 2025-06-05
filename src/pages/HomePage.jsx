import React, { useState, useEffect } from 'react';
import DashboardTemplate from '../components/templates/DashboardTemplate';
import MainDashboard from '../components/organisms/MainDashboard';
import { accountService } from '../services';

const HomePage = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
return (
    <DashboardTemplate
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      showAddModal={showAddModal}
      setShowAddModal={setShowAddModal}
      showSettings={showSettings}
      setShowSettings={setShowSettings}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    >
      <MainDashboard
        accounts={accounts}
        loading={loading}
        error={error}
        onAccountAdded={handleAccountAdded}
        onAccountDeleted={handleAccountDeleted}
        onAccountUpdated={handleAccountUpdated}
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
      />
    </DashboardTemplate>
  );
};

export default HomePage;