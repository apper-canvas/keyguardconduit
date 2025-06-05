import React from 'react';
      import Input from '../atoms/Input';
      
      const SearchInput = ({ placeholder, disabled = false }) => {
        return (
          <div className="relative w-full">
            <Input
              type="text"
              placeholder={placeholder}
              disabled={disabled}
              icon="Search"
              className="w-full pl-10 pr-4 py-2 bg-surface-700/50 border border-surface-600 rounded-lg text-surface-300 placeholder-surface-500 cursor-not-allowed"
            />
          </div>
        );
      };
      
      export default SearchInput;