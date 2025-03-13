// Sidebar.js
import React, { useState } from "react";

const Sidebar = ({
  items,
  selected,
  onSelect,
  className = "",
  sidebarWidth = "100%",
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div dir="rtl">
      <div className="hidden md:block">
        <div
          className={`bg-gray-100 border-l border-gray-300 p-4 h-screen ${className}`}
          style={{ width: sidebarWidth }}
        >
          <h2 className="font-bold text-lg mb-4">القائمة</h2>
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.value}
                className={`cursor-pointer p-2 rounded-md hover:bg-primary hover:text-white ${
                  selected === item.value
                    ? "bg-primary text-white"
                    : "text-gray-700"
                }`}
                onClick={() => onSelect(item.value)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Sidebar: toggled open/close */}
      <div className="md:hidden">
        {mobileOpen ? (
          <div className="bg-gray-100 border-l border-gray-300 p-4" dir="rtl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">القائمة</h2>
              <button
                onClick={() => setMobileOpen(false)}
                className="px-2 py-1 bg-primary text-white rounded-md focus:outline-none"
              >
                إغلاق
              </button>
            </div>
            <ul className="space-y-2">
              {items.map((item) => (
                <li
                  key={item.value}
                  className={`cursor-pointer p-2 rounded-md hover:bg-primary hover:text-white ${
                    selected === item.value
                      ? "bg-primary text-white"
                      : "text-gray-700"
                  }`}
                  onClick={() => {
                    onSelect(item.value);
                    setMobileOpen(false);
                  }}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="p-4" dir="rtl">
            <button
              onClick={() => setMobileOpen(true)}
              className="px-2 py-1 bg-primary text-white rounded-md focus:outline-none"
            >
              فتح القائمة
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
