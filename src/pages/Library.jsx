import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../ui/Card";
import SearchInput from "../ui/SearchInput";
import {
  useGetLibraryPostsQuery,
  useCreateLibraryPostMutation,
} from "../services/api";
import Button from "../ui/Button";
import CreateLibraryPostModal from "../components/CreateLibraryPostModal";

const Library = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { data: posts = [], isLoading } = useGetLibraryPostsQuery();
  const [createPost] = useCreateLibraryPostMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResources = posts.filter((post) =>
    post.title.includes(searchTerm)
  );

  console.log("🚀 ~ Library ~ user:", user);
  return (
    <div className="p-6" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center w-full">
          المكتبة الرقمية
        </h1>
        {user?.role === "admin" && (
          <Button label="إضافة منشور" onPress={() => setIsModalOpen(true)} />
        )}
      </div>

      <div className="max-w-md mx-auto mb-8">
        <SearchInput
          placeholder="ابحث عن مورد..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">جار التحميل...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card
              key={resource._id}
              coverImage={"https://picsum.photos/300"}
              title={resource.title}
              content={(resource.sections[0]?.html || "").slice(0, 100) + "..."}
              onPress={() => navigate(`/library/${resource._id}`)}
            />
          ))}
        </div>
      )}

      <CreateLibraryPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (values) => {
          try {
            await createPost(values).unwrap();
            setIsModalOpen(false);
          } catch (err) {
            console.error("فشل في إنشاء المنشور:", err);
            alert("حدث خطأ أثناء النشر");
          }
        }}
      />
    </div>
  );
};

export default Library;
