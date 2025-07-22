// src/ui/AccordionSidebar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AccordionSidebar({
  areas,
  selectedAreaId,
  selectedCompetencyId,
}) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = useNavigate();

  const toggleArea = (i) => setExpandedIndex(expandedIndex === i ? null : i);
  const select = (areaId, compId) => {
    nav(`/learning/${areaId}/${compId}`);
    setMobileOpen(false);
  };

  return (
    <div dir="rtl">
      {/* Desktop */}
      <div className="hidden md:block bg-gray-100 border-l border-gray-300 p-4 h-screen">
        <h2 className="font-bold text-lg mb-4">القائمة</h2>
        {areas.reverse().map((area, idx) => (
          <div key={area._id} className="mb-2">
            <button
              onClick={() => toggleArea(idx)}
              className="flex justify-between w-full px-2 py-2 bg-gray-200 hover:bg-gray-300"
            >
              <span className="font-bold text-right">{area.name}</span>
              <span>{expandedIndex === idx ? "▲" : "▼"}</span>
            </button>
            {expandedIndex === idx && (
              <ul className="bg-white mt-1">
                {area.competencies.map((comp) => (
                  <li
                    key={comp._id}
                    onClick={() => select(area._id, comp._id)}
                    className={`p-2 cursor-pointer text-gray-700 hover:bg-primary hover:text-white ${
                      selectedCompetencyId === comp._id
                        ? "bg-primary text-white"
                        : ""
                    }`}
                  >
                    {comp.name /* or comp.text */}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        {mobileOpen ? (
          <div className="bg-gray-100 p-4 border-l border-gray-300">
            <div className="flex justify-between mb-4">
              <h2 className="font-bold text-lg">القائمة</h2>
              <button
                onClick={() => setMobileOpen(false)}
                className="px-2 py-1 bg-primary text-white rounded"
              >
                إغلاق
              </button>
            </div>
            {areas.map((area, idx) => (
              <div key={area._id} className="mb-2">
                <button
                  onClick={() => toggleArea(idx)}
                  className="flex justify-between w-full px-2 py-2 bg-gray-200 hover:bg-gray-300"
                >
                  <span className="font-bold text-right">{area.name}</span>
                  <span>{expandedIndex === idx ? "▲" : "▼"}</span>
                </button>
                {expandedIndex === idx && (
                  <ul className="bg-white mt-1">
                    {area.competencies.map((comp) => (
                      <li
                        key={comp._id}
                        onClick={() => select(area._id, comp._id)}
                        className="p-2 cursor-pointer text-gray-700 hover:bg-primary hover:text-white"
                      >
                        {comp.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="px-2 py-1 bg-primary text-white rounded"
            >
              فتح القائمة
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
