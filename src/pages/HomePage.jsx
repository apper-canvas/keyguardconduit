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
    const loadAccounts = async () => {
      try {
        setLoading(true);
        setError(null);
        const accountsData = await accountService.getAll();
        setAccounts(accountsData || []);
      } catch (err) {
        setError('Failed to load accounts');
        console.error('Error loading accounts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAccounts();
  }, []);

  const handleAccountAdded = async (newAccount) => {
    try {
      const createdAccount = await accountService.create(newAccount);
      setAccounts(prev => [...(prev || []), createdAccount]);
      setShowAddModal(false);
    } catch (err) {
      setError('Failed to add account');
      console.error('Error adding account:', err);
    }
  };

  const handleAccountDeleted = async (accountId) => {
    try {
      await accountService.delete(accountId);
      setAccounts(prev => (prev || []).filter(account => account.id !== accountId));
    } catch (err) {
      setError('Failed to delete account');
      console.error('Error deleting account:', err);
    }
  };

  const handleAccountUpdated = async (accountId, updatedData) => {
    try {
      const updatedAccount = await accountService.update(accountId, updatedData);
      setAccounts(prev => 
        (prev || []).map(account => 
          account.id === accountId ? updatedAccount : account
        )
      );
    } catch (err) {
      setError('Failed to update account');
      console.error('Error updating account:', err);
    }
  };

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