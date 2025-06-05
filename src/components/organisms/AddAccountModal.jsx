import React, { useState } from 'react';
      import { toast } from 'react-toastify';
      import Modal from '../molecules/Modal';
      import AddAccountOptions from '../molecules/AddAccountOptions';
      import AccountForm from './AccountForm';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      import Button from '../atoms/Button';
      import { accountService } from '../../services';
      
      const AddAccountModal = ({ 
        showAddModal, 
        setShowAddModal, 
        onAccountAdded, 
        editingAccount, 
        setEditingAccount,
        onAccountUpdated
      }) => {
        const [showQRScanner, setShowQRScanner] = useState(false);
        const [showManualEntry, setShowManualEntry] = useState(false);
      
        const resetModal = () => {
          setShowAddModal(false);
          setShowQRScanner(false);
          setShowManualEntry(false);
          setEditingAccount(null);
        };
      
        const handleSubmitAccount = async (formData) => {
          try {
            if (editingAccount) {
              const updatedAccount = await accountService.update(editingAccount.id, formData);
              onAccountUpdated(updatedAccount);
              toast.success('Account updated successfully');
            } else {
              const newAccount = await accountService.create(formData);
              onAccountAdded(newAccount);
              toast.success('Account added successfully');
            }
            resetModal();
          } catch (err) {
            toast.error(editingAccount ? 'Failed to update account' : 'Failed to add account');
          }
        };
      
        return (
          <Modal show={showAddModal} onClose={resetModal} showCloseButton={false} className="max-w-md">
            {!showQRScanner && !showManualEntry ? (
              <AddAccountOptions 
                onScanQR={() => setShowQRScanner(true)} 
                onManualEntry={() => setShowManualEntry(true)} 
              />
            ) : showQRScanner ? (
              &lt;&gt;
                <div className="flex items-center justify-between mb-6">
                  <Text type="h3" className="text-lg font-semibold text-surface-50">Scan QR Code</Text>
                  <Button
                    onClick={() => setShowQRScanner(false)}
                    className="p-2 hover:bg-surface-700 rounded-lg transition-colors"
                    variant="ghost"
                  >
                    &lt;Icon name="X" className="h-5 w-5 text-surface-400" /&gt;
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="aspect-square bg-surface-900 rounded-xl border-2 border-dashed border-surface-600 flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="Camera" className="h-12 w-12 text-surface-400 mx-auto mb-2" />
                      <Text type="p" className="text-surface-400">Camera preview would appear here</Text>
                      <Text type="p" className="text-xs text-surface-500 mt-1">QR scanning - Coming soon</Text>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => {
                      setShowQRScanner(false);
                      setShowManualEntry(true);
                    }}
                    className="w-full"
                    variant="text"
                  >
                    Enter manually instead
                  </Button>
                </div>
              &lt;/&gt;
            ) : (
              <AccountForm 
                editingAccount={editingAccount}
                onSubmit={handleSubmitAccount}
                onCancel={() => {
                  if (editingAccount) { // If editing, go back to no options, don't show options again
                    resetModal();
                  } else { // If adding, go back to options
                    setShowManualEntry(false);
                  }
                }}
                setShowManualEntry={setShowManualEntry}
                setShowAddModal={setShowAddModal}
              />
            )}
          </Modal>
        );
      };
      
      export default AddAccountModal;