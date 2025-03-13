// // LearningModules.js
// import React, { useState } from "react";
// import Sidebar from "../ui/Sidebar";
// import AccordionSidebar from "../ui/AccordionSidebar";
// import { digcompAreas } from "../data/digCompData";

// function Learning() {
//   const [selectedArea, setSelectedArea] = useState(null);
//   const [selectedTopic, setSelectedTopic] = useState(null);

//   const handleSelect = (areaId, topic) => {
//     setSelectedArea(areaId);
//     setSelectedTopic(topic);
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen" dir="rtl">
//       {/* Sidebar with Accordion for Areas and Topics */}
//       <div className="w-full md:w-1/4">
//         <AccordionSidebar
//           areas={digcompAreas}
//           onSelect={handleSelect}
//           selectedAreaId={selectedArea}
//           selectedTopic={selectedTopic}
//         />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-4 bg-gray-50">
//         <h1 className="text-2xl font-bold mb-4">المحتوى التعليمي</h1>
//         {selectedTopic ? (
//           <div>
//             <p className="mb-2">المجال: {selectedArea}</p>
//             <p className="mb-4">الموضوع: {selectedTopic}</p>
//             <p>
//               هنا يمكنك عرض الموارد والمحتوى الخاص بالموضوع "{selectedTopic}" في
//               إطار المجال "{selectedArea}".
//             </p>
//           </div>
//         ) : (
//           <p className="text-gray-500">
//             اختر مجالاً وموضوعاً من القائمة للبدء.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Learning;
// LearningModulesLayout.js
import React from "react";
import AccordionSidebar from "../ui/AccordionSidebar";
import { digcompAreas } from "../data/digCompData";
import { Outlet } from "react-router-dom";

const Learning = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen" dir="rtl">
      {/* Sidebar Column */}
      <div className="w-full md:w-1/4">
        <AccordionSidebar areas={digcompAreas} />
      </div>
      {/* Main Content Column */}
      <div className="flex-1 p-4 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Learning;
