import React from 'react';
      import Icon from './Icon';
      
      const Input = ({ 
        type = "text", 
        value, 
        onChange, 
        placeholder, 
        className = '', 
        disabled = false, 
        icon: IconName, 
        onPaste, 
        ...props 
      }) => {
        const baseClasses = "w-full px-3 py-2 bg-surface-700 border border-surface-600 rounded-lg text-surface-50 placeholder-surface-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors";
        const disabledClasses = disabled ? "cursor-not-allowed opacity-75" : "";
        const iconPadding = IconName ? "pl-10" : "";
        const pasteIconPadding = onPaste ? "pr-10" : "";
      
        return (
          <div className="relative">
            {IconName && (
              <Icon name={IconName} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
            )}
            <input
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              disabled={disabled}
              className={`${baseClasses} ${iconPadding} ${pasteIconPadding} ${disabledClasses} ${className}`}
              {...props}
            />
            {onPaste && (
              <button
                type="button"
                onClick={onPaste}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-surface-600 rounded transition-colors"
              >
                <Icon name="Clipboard" className="h-4 w-4 text-surface-400" />
              </button>
            )}
          </div>
        );
      };
      
      export default Input;