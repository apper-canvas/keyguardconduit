import React from 'react';
      
      const ProgressBar = ({ value, max, size = 40, className = "" }) => {
        const percentage = (value / max) * 100;
        const circumference = 2 * Math.PI * 16;
        const strokeDasharray = circumference;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;
        
        return (
          <div className={`relative ${className}`} style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
              <circle
                cx={size / 2}
                cy={size / 2}
                r="16"
                stroke="currentColor"
                strokeWidth="3"
                fill="transparent"
                className="text-surface-600"
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r="16"
                stroke="currentColor"
                strokeWidth="3"
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className={`transition-all duration-1000 ${
                  value &lt;= 10 ? 'text-accent' : 'text-secondary'
                }`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-xs font-mono ${
                value &lt;= 10 ? 'text-accent' : 'text-surface-300'
              }`}>
                {value}
              </span>
            </div>
          </div>
        );
      };
      
      export default ProgressBar;