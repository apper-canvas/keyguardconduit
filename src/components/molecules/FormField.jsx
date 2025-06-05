import React from 'react';
      import Label from '../atoms/Label';
      import Input from '../atoms/Input';
      
      const FormField = ({ label, id, type, value, onChange, placeholder, required = false, onPaste }) => {
        return (
          <div>
            <Label htmlFor={id}>
              {label} {required && &lt;span&gt;*&lt;/span&gt;}
            </Label>
            <Input
              id={id}
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required={required}
              onPaste={onPaste}
              className={type === 'text' && id === 'secretKey' ? 'font-mono text-sm' : ''}
            />
          </div>
        );
      };
      
      export default FormField;