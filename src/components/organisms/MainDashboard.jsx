import React, { useState } from 'react';
      import { toast } from 'react-toastify';
      import { accountService } from '../../services';
      import StatCard from '../molecules/StatCard';
      import AccountGrid from './AccountGrid';
      import DeleteConfirmationModal from './DeleteConfirmationModal';
      import AddAccountModal from './AddAccountModal';
      import LoadingSpinner from '../atoms/LoadingSpinner';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      
      const MainDashboard = ({ 
        accounts, 
        loading, 
        error, 
        onAccountAdded, 
        onAccountDeleted, 
        onAccountUpdated,
        showAddModal,
        setShowAddModal 
      }) => {
        const [showDeleteModal, setShowDeleteModal] = useState(false);
        const [accountToDelete, setAccountToDelete] = useState(null);
        const [editingAccount, setEditingAccount] = useState(null);
      
        const handleDeleteAccount = (account) => {
          setAccountToDelete(account);
          setShowDeleteModal(true);
        };
      
        const confirmDelete = async () => {
          if (!accountToDelete) return;
          
          try {
            await accountService.delete(accountToDelete.id);
            onAccountDeleted(accountToDelete.id);
            toast.success(`${accountToDelete.serviceName} account deleted`);
            setShowDeleteModal(false);
            setAccountToDelete(null);
          } catch (err) {
            toast.error('Failed to delete account');
          }
        };
      
        const handleEditAccount = (account) => {
          setEditingAccount(account);
          setShowAddModal(true); // Re-use the add account modal for editing
        };
      
        if (loading) {
          return (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner />
            </div>
          );
        }
      
        if (error) {
          return (
            <div className="text-center py-20">
              <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <Icon name="AlertTriangle" className="h-8 w-8 text-red-400" />
              </div>
              <Text type="p" className="text-red-400">{error}</Text>
            </div>
          );
        }
      
        return (
          <div className="space-y-8">
            {/* Header Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                iconName="Shield"
                iconBgClass="bg-primary/20"
                label="Total Accounts"
                value={accounts?.length || 0}
/>
              
              <StatCard
                iconName="Clock"
                iconBgClass="bg-secondary/20"
                label="Active Codes"
                value={accounts?.length || 0}
              />
              <StatCard
                iconName="Zap"
                iconBgClass="bg-accent/20"
                label="Security Level"
                value="High"
              />
            </div>
      
            {/* Accounts Grid */}
            <AccountGrid
              accounts={accounts}
              setShowAddModal={setShowAddModal}
              onAccountDeleted={onAccountDeleted}
              onAccountUpdated={onAccountUpdated}
              onEditAccount={handleEditAccount}
              onDeleteAccount={handleDeleteAccount}
            />
      
            {/* Add/Edit Account Modal */}
            <AddAccountModal
              showAddModal={showAddModal}
              setShowAddModal={setShowAddModal}
              onAccountAdded={onAccountAdded}
              onAccountUpdated={onAccountUpdated}
              editingAccount={editingAccount}
              setEditingAccount={setEditingAccount}
            />
      
            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
              show={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              onConfirm={confirmDelete}
              accountName={accountToDelete?.serviceName}
            />
          </div>
        );
      };
      
      export default MainDashboard;