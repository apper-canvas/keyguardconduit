import React from 'react';
      import Modal from '../molecules/Modal';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      import Button from '../atoms/Button';
      
      const DeleteConfirmationModal = ({ show, onClose, onConfirm, accountName }) => {
        return (
          <Modal show={show} onClose={onClose} showCloseButton={false}>
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <Icon name="AlertTriangle" className="h-8 w-8 text-red-400" />
              </div>
              <Text type="h3" className="text-lg font-semibold text-surface-50 mb-2">Delete Account</Text>
              <Text type="p" className="text-surface-400">
                Are you sure you want to delete &lt;strong&gt;{accountName}&lt;/strong&gt;?
                This action cannot be undone.
              </Text>
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={onClose}
                className="flex-1 py-2 px-4"
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={onConfirm}
                className="flex-1 py-2 px-4"
                variant="danger"
              >
                Delete
              </Button>
            </div>
          </Modal>
        );
      };
      
      export default DeleteConfirmationModal;