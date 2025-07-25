import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import book1Img from "../assets/book2.png";

import Button from "../ui/Button";
import EditLibraryPostModal from "../components/EditLibraryPostModal";
import {
  useGetLibraryPostByIdQuery,
  useDeleteLibraryPostMutation,
  useUpdateLibraryPostMutation,
} from "../services/api";

import Loader from "../ui/Loader";
import ErrorState from "../ui/ErrorState";

const LibraryPost = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === "admin";

  const { data: item, isLoading, error } = useGetLibraryPostByIdQuery(itemId);
  const [deletePost] = useDeleteLibraryPostMutation();
  const [updatePost] = useUpdateLibraryPostMutation();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("هل أنت متأكد من حذف هذا المنشور؟")) {
      try {
        await deletePost(itemId).unwrap();
        navigate("/library");
      } catch (err) {
        alert("فشل في حذف المنشور");
        console.error(err);
      }
    }
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
        {isLoading ? (
          <Loader message="جاري تحميل البيانات التعليمية..." />
        ) : error ? (
          <ErrorState message="فشل في جلب المحتوى ." />
        ) : (
          <>
            <img
              src={book1Img}
              alt="صورة المنشور"
              className="w-full h-48 object-cover mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
            {item.sections.map((section, index) => (
              <div key={index} className="mb-6">
                <h2 className="text-xl font-semibold mb-1">{section.title}</h2>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: section.html }}
                />
              </div>
            ))}
            <p className="text-sm text-gray-500 mt-2">
              الكاتب:{" "}
              {item.author?.firstName || item.author?.lastName || "غير معروف"} |
              التاريخ: {new Date(item.createdAt).toLocaleDateString("ar-EG")}
            </p>

            {isAdmin && (
              <div className="flex gap-2 mt-4">
                <Button label="تعديل" onPress={() => setIsEditOpen(true)} />
                <Button
                  label="حذف"
                  onPress={handleDelete}
                  type="tertiary"
                  color="red"
                />
              </div>
            )}

            <EditLibraryPostModal
              open={isEditOpen}
              onClose={() => setIsEditOpen(false)}
              initialPost={item}
              onSubmit={async (data) => {
                try {
                  await updatePost(data).unwrap();
                } catch (err) {
                  alert("فشل في تعديل المنشور");
                  console.error("Edit error:", err);
                }
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default LibraryPost;
