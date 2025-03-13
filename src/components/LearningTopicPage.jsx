// LearningTopicPage.js
import React from "react";
import { useParams } from "react-router-dom";

const LearningTopicPage = () => {
  const { areaId, topic } = useParams();

  return (
    <div className="p-4 bg-gray-50" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">المحتوى التعليمي</h1>
      <div>
        <p className="mb-2">المنطقة: {areaId}</p>
        <p className="mb-4">الموضوع: {decodeURIComponent(topic)}</p>
        <p>
          هنا يتم عرض المحتوى والموارد الخاصة بالموضوع "
          {decodeURIComponent(topic)}" في إطار المجال "{areaId}".
        </p>
      </div>
    </div>
  );
};

export default LearningTopicPage;
