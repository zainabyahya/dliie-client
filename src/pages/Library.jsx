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
import book1Img from "../assets/book2.png";
import book2Img from "../assets/book2.png";
import Loader from "../ui/Loader";

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
        <Loader message="جاري تحميل البيانات التعليمية..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {filteredResources.map((resource, index) => (
            <Card
              key={resource._id}
              coverImage={index % 2 === 0 ? book1Img : book2Img}
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
