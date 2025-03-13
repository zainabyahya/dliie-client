// Community.js
import React, { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
// import SearchInput from '../ui/SearchInput'; // Optional if you want a search bar

function Community() {
  // Sample posts data; each post has a type: "question" or "post"
  const posts = [
    {
      id: 1,
      type: "question",
      title: "سؤال 1",
      content: "هذا هو محتوى السؤال الأول.",
    },
    {
      id: 2,
      type: "post",
      title: "مشاركة 1",
      content: "هذا هو محتوى المشاركة الأولى.",
    },
    {
      id: 3,
      type: "question",
      title: "سؤال 2",
      content: "هذا هو محتوى السؤال الثاني.",
    },
    {
      id: 4,
      type: "post",
      title: "مشاركة 2",
      content: "هذا هو محتوى المشاركة الثانية.",
    },
    {
      id: 5,
      type: "question",
      title: "سؤال 3",
      content: "هذا هو محتوى السؤال الثالث.",
    },
    {
      id: 6,
      type: "post",
      title: "مشاركة 3",
      content: "هذا هو محتوى المشاركة الثالثة.",
    },
    // Add more posts as needed...
  ];

  const pageSize = 2; // posts per page
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("all"); // 'all' | 'question' | 'post'

  // Filter posts based on type
  const filteredPosts = posts.filter((post) =>
    filterType === "all" ? true : post.type === filterType
  );

  // Calculate pagination values
  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-3xl font-bold mb-6 text-center">المجتمع</h1>

      {/* Optional: Search Bar */}
      {/*
      <div className="max-w-md mx-auto mb-8">
        <SearchInput
          placeholder="ابحث عن منشور..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      */}

      {/* Filter Tabs */}
      <div className="flex justify-center mb-4 space-x-2">
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
            setFilterType("question");
            setCurrentPage(1);
          }}
          type={filterType === "question" ? "primary" : "secondary"}
          shape="rectangle"
          width="auto"
        />
        <Button
          label="المشاركات"
          onPress={() => {
            setFilterType("post");
            setCurrentPage(1);
          }}
          type={filterType === "post" ? "primary" : "secondary"}
          shape="rectangle"
          width="auto"
        />
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentPosts.map((post) => (
          <Card
            key={post.id}
            image={null} // If you have images, provide a URL
            title={post.title}
            content={post.content}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2">
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
