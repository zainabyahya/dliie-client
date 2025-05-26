import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import Button from "../ui/Button";
import CreateCommunityPostModal from "../components/CreateCommunityPostModal";
import {
  useCreateCommunityPostMutation,
  useGetCommunityPostsQuery,
} from "../services/api";

function Community() {
  const navigate = useNavigate();
  const [createPost] = useCreateCommunityPostMutation();
  const { data: posts = [], isLoading, error } = useGetCommunityPostsQuery();
  console.log("🚀 ~ Community ~ data:", posts);

  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("all");
  const [isModalOpen, setModalOpen] = useState(false);

  const pageSize = 2;
  const filteredPosts = posts.filter((post) =>
    filterType === "all" ? true : post.type === filterType
  );
  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => setCurrentPage(page);
  const handleCardClick = (postId) => navigate(`/community/${postId}`);
  const handleCreateClick = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleNewPost = async ({ type, title, html }) => {
    try {
      await createPost({ type, title, html }).unwrap();
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to save community post:", err);
      alert("حدث خطأ أثناء النشر");
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filterType]);

  return (
    <div className="p-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">المجتمع</h1>
        <Button
          label="إنشاء منشور جديد"
          onPress={handleCreateClick}
          type="primary"
          shape="rectangle"
        />
      </div>

      {/* Filters */}
      <div className="flex justify-center mb-4 gap-x-2">
        {["all", "question", "post"].map((ft) => (
          <Button
            key={ft}
            label={
              ft === "all"
                ? "الكل"
                : ft === "question"
                ? "الأسئلة"
                : "المشاركات"
            }
            onPress={() => setFilterType(ft)}
            type={filterType === ft ? "primary" : "secondary"}
            shape="rectangle"
            width="auto"
          />
        ))}
      </div>

      {/* Posts */}
      {isLoading ? (
        <p className="text-center text-gray-500">جار التحميل...</p>
      ) : error ? (
        <p className="text-center text-red-500">فشل تحميل البيانات.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentPosts.map((post) => (
            <Card
              key={post._id}
              image={null}
              title={post.title}
              content={post.html}
              onPress={() => handleCardClick(post._id)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            label={page.toString()}
            onPress={() => handlePageChange(page)}
            type={page === currentPage ? "primary" : "secondary"}
            shape="rectangle"
            width="40px"
          />
        ))}
      </div>

      {/* Modal */}
      <CreateCommunityPostModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleNewPost}
      />
    </div>
  );
}

export default Community;
