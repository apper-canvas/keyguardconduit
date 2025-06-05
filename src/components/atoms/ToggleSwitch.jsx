import React from 'react';
      
      const ToggleSwitch = ({ checked, onChange, className = '' }) => {
        return (
          <button
            onClick={onChange}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-ring ${
              checked ? 'bg-primary' : 'bg-surface-600'
            } ${className}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                checked ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        );
      };
      
      export default ToggleSwitch;