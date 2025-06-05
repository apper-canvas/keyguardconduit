import React, { useState, useEffect } from 'react';
      import { toast } from 'react-toastify';
      import FormField from '../molecules/FormField';
      import Button from '../atoms/Button';
      import Icon from '../atoms/Icon';
      
      const AccountForm = ({ 
        editingAccount, 
        onSubmit, 
        onCancel, 
        setShowManualEntry, 
        setShowAddModal 
      }) => {
        const [formData, setFormData] = useState({
          serviceName: '',
          accountName: '',
          secretKey: '',
          algorithm: 'SHA1',
          digits: 6,
          period: 30
        });
      
        useEffect(() => {
          if (editingAccount) {
            setFormData({
              serviceName: editingAccount.serviceName,
              accountName: editingAccount.accountName,
              secretKey: editingAccount.secretKey,
              algorithm: editingAccount.algorithm,
              digits: editingAccount.digits,
              period: editingAccount.period
            });
          } else {
            setFormData({
              serviceName: '',
              accountName: '',
              secretKey: '',
              algorithm: 'SHA1',
              digits: 6,
              period: 30
            });
          }
        }, [editingAccount]);
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData(prev => ({ ...prev, [name]: value }));
        };
      
        const handlePasteSecretKey = async () => {
          try {
            const text = await navigator.clipboard.readText();
            setFormData(prev => ({ ...prev, secretKey: text }));
            toast.success('Secret key pasted');
          } catch (err) {
            toast.error('Failed to paste from clipboard');
          }
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          if (!formData.serviceName || !formData.accountName || !formData.secretKey) {
            toast.error('Please fill in all required fields');
            return;
          }
          onSubmit(formData);
        };
      
        return (
          &lt;&gt;
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-surface-50">
                {editingAccount ? 'Edit Account' : 'Add Account Manually'}
              </h3>
              <button
                onClick={() => {
                  setShowManualEntry(false);
                  setShowAddModal(false); // Close the main modal if directly opened for manual entry
                  onCancel(); // Reset editingAccount in parent
                }}
                className="p-2 hover:bg-surface-700 rounded-lg transition-colors"
              >
                <Icon name="X" className="h-5 w-5 text-surface-400" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                label="Service Name"
                id="serviceName"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleChange}
                placeholder="e.g., Google, GitHub, Discord"
                required
              />
              
              <FormField
                label="Account Name"
                id="accountName"
                name="accountName"
                value={formData.accountName}
                onChange={handleChange}
                placeholder="e.g., john@example.com"
                required
              />
              
              <FormField
                label="Secret Key"
                id="secretKey"
                name="secretKey"
                value={formData.secretKey}
                onChange={handleChange}
                placeholder="Enter the secret key from the service"
                required
                onPaste={handlePasteSecretKey}
              />
              
              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  onClick={() => {
                    setShowManualEntry(false);
                    onCancel(); // Reset editingAccount
                  }}
                  className="flex-1 py-2 px-4"
                  variant="secondary"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 py-2 px-4"
                  variant="primary"
                >
                  {editingAccount ? 'Update' : 'Add Account'}
                </Button>
              </div>
            </form>
          &lt;/&gt;
        );
      };
      
      export default AccountForm;