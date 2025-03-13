// SearchInput.js
import React from "react";

const SearchInput = ({ value, onChange, placeholder, className = "" }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    dir="rtl"
  />
);

export default SearchInput;
