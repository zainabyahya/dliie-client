// Modal.js
import React from 'react';

const Modal = ({ open, onClose, title, children, className = "" }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" dir="rtl">
      <div className={`bg-white rounded-md shadow-lg overflow-hidden max-w-lg w-full ${className}`}>
        <div className="flex justify-between items-center p-4 border-b">
          {title && <h2 className="text-xl font-bold">{title}</h2>}
          <button 
            onClick={onClose} 
            className="text-xl font-bold focus:outline-none"
            aria-label="إغلاق"
          >
            ×
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
