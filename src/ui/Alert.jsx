// Alert.js
import React, { useState } from 'react';

const Alert = ({ type = 'info', message, closable = false, className = "" }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  // Set styling based on alert type
  let bgColor = "bg-blue-100";
  let textColor = "text-blue-800";
  let borderColor = "border-blue-300";

  if (type === 'success') {
    bgColor = "bg-green-100";
    textColor = "text-green-800";
    borderColor = "border-green-300";
  } else if (type === 'error') {
    bgColor = "bg-red-100";
    textColor = "text-red-800";
    borderColor = "border-red-300";
  } else if (type === 'warning') {
    bgColor = "bg-yellow-100";
    textColor = "text-yellow-800";
    borderColor = "border-yellow-300";
  } else if (type === 'info') {
    bgColor = "bg-blue-100";
    textColor = "text-blue-800";
    borderColor = "border-blue-300";
  }

  return (
    <div className={`border-l-4 p-4 ${bgColor} ${textColor} ${borderColor} ${className}`} dir="rtl">
      <div className="flex justify-between items-center">
        <p className="flex-1">{message}</p>
        {closable && (
          <button 
            onClick={() => setVisible(false)}
            className="text-xl font-bold focus:outline-none ml-2"
            aria-label="إغلاق"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
