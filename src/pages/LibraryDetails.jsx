// LibraryDetails.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const LibraryDetails = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();

  // Dummy data for demonstration.
  // In a real app, you would fetch item details from a database/API based on the itemId.
  const item = {
    id: itemId,
    title: `تفاصيل الكتاب ${itemId}`,
    content:
      "هذا هو المحتوى التفصيلي للكتاب. هنا يمكنك قراءة الوصف الكامل والتفاصيل الخاصة بالكتاب، مثل ملخص المحتوى والمراجعات والمزيد من المعلومات.",
    coverImage: "https://picsum.photos/300/200",
    author: "الناشر",
    date: "2024-03-15",
  };

  return (
    <div className="p-6" dir="rtl">
      <Button
        label="عودة للمكتبة"
        onPress={() => navigate(-1)}
        type="secondary"
        shape="rectangle"
      />
      <div className="mt-4 bg-white p-6 rounded-md shadow-md">
        {item.coverImage && (
          <img
            src={item.coverImage}
            alt="صورة الكتاب"
            className="w-full h-48 object-cover mb-4"
          />
        )}
        <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
        <p className="mb-4">{item.content}</p>
        <p className="text-sm text-gray-500">
          الناشر: {item.author} | التاريخ: {item.date}
        </p>
      </div>
    </div>
  );
};

export default LibraryDetails;
