// AccordionSidebar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AccordionSidebar = ({ areas, selectedAreaId, selectedTopic }) => {
  // Track which area (by index) is currently expanded
  const [expandedIndex, setExpandedIndex] = useState(null);
  // Mobile toggle state
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleArea = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Handle selection: navigate to a dedicated route for the topic.
  const handleSelect = (areaId, topic) => {
    navigate(`/learning/${areaId}/${encodeURIComponent(topic)}`);
  };

  return (
    <div dir="rtl">
      {/* Desktop View: always visible */}
      <div className="hidden md:block">
        <div className="bg-gray-100 border-l border-gray-300 p-4 h-screen w-full">
          <h2 className="font-bold text-lg mb-4">القائمة</h2>
          {areas.map((area, index) => (
            <div key={area.id} className="mb-2">
              <button
                onClick={() => toggleArea(index)}
                className="block w-full text-right px-2 py-2 whitespace-normal bg-gray-200 hover:bg-gray-300 focus:outline-none flex justify-between items-center"
              >
                <span className="font-bold break-words">{area.label}</span>
                <span>{expandedIndex === index ? "▲" : "▼"}</span>
              </button>
              {expandedIndex === index && (
                <ul className="space-y-2 bg-white mt-1">
                  {area.topics.map((topic, i) => (
                    <li
                      key={i}
                      className={`cursor-pointer p-2 rounded-md hover:bg-primary hover:text-white break-words ${
                        selectedAreaId === area.id && selectedTopic === topic
                          ? "bg-primary text-white"
                          : "text-gray-700"
                      }`}
                      onClick={() => handleSelect(area.id, topic)}
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View: toggleable and auto-height */}
      <div className="md:hidden">
        {mobileOpen ? (
          <div
            className="bg-gray-100 border-l border-gray-300 p-4 w-full"
            dir="rtl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">القائمة</h2>
              <button
                onClick={() => setMobileOpen(false)}
                className="px-2 py-1 bg-primary text-white rounded-md focus:outline-none"
              >
                إغلاق
              </button>
            </div>
            {areas.map((area, index) => (
              <div key={area.id} className="mb-2">
                <button
                  onClick={() => toggleArea(index)}
                  className="block w-full text-right px-2 py-2 whitespace-normal bg-gray-200 hover:bg-gray-300 focus:outline-none flex justify-between items-center"
                >
                  <span className="font-bold break-words">{area.label}</span>
                  <span>{expandedIndex === index ? "▲" : "▼"}</span>
                </button>
                {expandedIndex === index && (
                  <ul className="space-y-2 bg-white mt-1">
                    {area.topics.map((topic, i) => (
                      <li
                        key={i}
                        className={`cursor-pointer p-2 rounded-md hover:bg-primary hover:text-white break-words ${
                          selectedAreaId === area.id && selectedTopic === topic
                            ? "bg-primary text-white"
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          handleSelect(area.id, topic);
                          setMobileOpen(false);
                        }}
                      >
                        {topic}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
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

export default AccordionSidebar;
