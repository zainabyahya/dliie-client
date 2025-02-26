
import React, { useState } from 'react';

const Accordion = ({ items, className = "" }) => {
  // activeIndex stores the index of the currently open item (or null if none are open)
  const [activeIndex, setActiveIndex] = useState(null);

  // Toggle the active accordion item
  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`border rounded-md ${className}`} dir="rtl">
      {items.map((item, index) => (
        <div key={index} className="border-b last:border-0">
          <button
            onClick={() => toggleIndex(index)}
            className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none flex justify-between items-center"
          >
            <span className="font-bold">{item.title}</span>
            {/* Display an arrow indicating open/close state */}
            <span>{activeIndex === index ? "▲" : "▼"}</span>
          </button>
          {activeIndex === index && (
            <div className="px-4 py-2 bg-white">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
