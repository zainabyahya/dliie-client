import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ 
  options,           // Array of option objects { value, label }
  selected,          // Currently selected option
  onChange,          // Function to call when an option is selected
  placeholder = "اختر...", // Default Arabic placeholder meaning "Choose..."
  className = ""
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle option selection
  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef} dir="rtl">
      <button 
        type="button"
        className="w-full px-4 py-2 border rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <span>{ selected ? selected.label : placeholder }</span>
        <svg 
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${open ? "rotate-180" : ""}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-full bg-white border rounded-md shadow-lg z-10">
          {options.map((option) => (
            <div 
              key={option.value} 
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
