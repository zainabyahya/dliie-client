// Library.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import SearchInput from "../ui/SearchInput";

function Library() {
  const navigate = useNavigate();

  const resources = [
    {
      id: 1,
      coverImage: "https://picsum.photos/300",
      title: "مقدمة في الثقافة الرقمية",
      content: "دليل شامل لفهم الثقافة الرقمية وتطبيقها في بيئة التعليم.",
    },
    {
      id: 2,
      coverImage: "https://picsum.photos/300",
      title: "المهارات الرقمية للمربين",
      content:
        "كيفية تعزيز المهارات الرقمية للمربين لتحسين جودة العملية التعليمية.",
    },
    {
      id: 3,
      coverImage: "https://picsum.photos/300",
      title: "التواصل الرقمي الفعال",
      content: "استراتيجيات إدارة المعلومات والتواصل الرقمي في العصر الحديث.",
    },
    {
      id: 4,
      coverImage: "https://picsum.photos/300",
      title: "الأخلاقيات الرقمية",
      content: "مبادئ الأخلاقيات الرقمية وكيفية تطبيقها في المؤسسات التعليمية.",
    },
    {
      id: 5,
      coverImage: "https://picsum.photos/300",
      title: "أدوات التعلم الرقمي",
      content:
        "نظرة عامة على الأدوات والتقنيات التي تدعم التعلم الرقمي والتفاعل في الصفوف.",
    },
    {
      id: 6,
      coverImage: "https://picsum.photos/300",
      title: "التحديات الرقمية في التعليم",
      content: "تحليل للتحديات والفرص في تطبيق التكنولوجيا الرقمية في التعليم.",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  // Filter resources based on the search term (checking title and subtitle)
  const filteredResources = resources.filter(
    (resource) =>
      (resource.title || "").includes(searchTerm) ||
      (resource.subtitle || "").includes(searchTerm)
  );

  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-3xl font-bold mb-6 text-center">المكتبة الرقمية</h1>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <SearchInput
          placeholder="ابحث عن مورد..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card
            key={resource.id}
            coverImage={resource.coverImage}
            title={resource.title}
            content={resource.content}
            onPress={() => navigate(`/library/${resource.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
export default Library;
