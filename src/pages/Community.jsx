// Community.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import Button from "../ui/Button";

function Community() {
  const navigate = useNavigate();

  // Sample posts data; each post has a type: "question" or "post"
  const posts = [
    {
      id: 1,
      type: "Question",
      title: "سؤال 1",
      content: "هذا هو محتوى السؤال الأول.",
    },
    {
      id: 2,
      type: "Post",
      title: "مشاركة 1",
      content: "هذا هو محتوى المشاركة الأولى.",
    },
    {
      id: 3,
      type: "Question",
      title: "سؤال 2",
      content: "هذا هو محتوى السؤال الثاني.",
    },
    {
      id: 4,
      type: "Post",
      title: "مشاركة 2",
      content: "هذا هو محتوى المشاركة الثانية.",
    },
    {
      id: 5,
      type: "Question",
      title: "سؤال 3",
      content: "هذا هو محتوى السؤال الثالث.",
    },
    {
      id: 6,
      type: "Post",
      title: "مشاركة 3",
      content: "هذا هو محتوى المشاركة الثالثة.",
    },
    // Add more posts as needed...
  ];

  const pageSize = 2; // posts per page
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("all"); // 'all' | 'Question' | 'Post'

  // Filter posts based on type
  const filteredPosts = posts.filter((post) =>
    filterType === "all" ? true : post.type === filterType
  );

  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Navigate to CommunityDetail page on card click
  const handleCardClick = (postId) => {
    navigate(`/community/${postId}`);
  };

  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-3xl font-bold mb-6 text-center">المجتمع</h1>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-4 gap-x-2">
        <Button
          label="الكل"
          onPress={() => {
            setFilterType("all");
            setCurrentPage(1);
          }}
          type={filterType === "all" ? "primary" : "secondary"}
          shape="rectangle"
          width="auto"
        />
        <Button
          label="الأسئلة"
          onPress={() => {
            setFilterType("Question");
            setCurrentPage(1);
          }}
          type={filterType === "Question" ? "primary" : "secondary"}
          shape="rectangle"
          width="auto"
        />
        <Button
          label="المشاركات"
          onPress={() => {
            setFilterType("Post");
            setCurrentPage(1);
          }}
          type={filterType === "Post" ? "primary" : "secondary"}
          shape="rectangle"
          width="auto"
        />
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentPosts.map((post) => (
          <Card
            key={post.id}
            image={null} // Add image URL if available
            title={post.title}
            content={post.content}
            // When the card is pressed, navigate to its detail page
            onPress={() => handleCardClick(post.id)}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 gap-x-2">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <Button
              key={page}
              label={page.toString()}
              onPress={() => handlePageChange(page)}
              type={page === currentPage ? "primary" : "secondary"}
              shape="rectangle"
              width="40px"
            />
          )
        )}
      </div>
    </div>
  );
}

export default Community;
