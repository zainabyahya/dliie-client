// CommunityDetail.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const CommunityDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  // Dummy data for demonstration
  const post = {
    id: postId,
    type: postId % 2 === 0 ? "منشور" : "سؤال",
    title: postId % 2 === 0 ? "تفاصيل المنشور" : "تفاصيل السؤال",
    content:
      "هذا هو المحتوى التفصيلي للمنشور. يمكنك قراءة المزيد من التفاصيل هنا.",
    author: "المستخدم",
    date: "2024-03-13",
  };

  return (
    <div className="p-6" dir="rtl">
      <Button
        label="عودة للمجتمع"
        onPress={() => navigate(-1)}
        type="secondary"
        shape="rectangle"
      />
      <div className="mt-4 bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-600 mb-4">{post.type}</p>
        <p className="mb-4">{post.content}</p>
        <p className="text-sm text-gray-500">
          الكاتب: {post.author} | التاريخ: {post.date}
        </p>
      </div>
    </div>
  );
};

export default CommunityDetail;
