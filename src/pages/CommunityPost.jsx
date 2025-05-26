import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "../ui/Button";
import FormWrapper from "../ui/FormWrapper";
import Modal from "../ui/Modal";

import {
  useGetCommunityPostByIdQuery,
  useAddCommentToPostMutation,
  useDeleteCommunityPostMutation,
  useDeleteCommentMutation,
  useUpdateCommunityPostMutation,
} from "../services/api";

const CommunityPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const { data: post, isLoading, error } = useGetCommunityPostByIdQuery(postId);
  const [addComment] = useAddCommentToPostMutation();
  const [deletePost] = useDeleteCommunityPostMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [updatePost] = useUpdateCommunityPostMutation();

  const [isEditOpen, setIsEditOpen] = React.useState(false);

  const isPostAuthor = post?.author?._id === user?._id;
  const isCommentAuthor = (comment) => comment?.author?._id === user?._id;

  const handleDeletePost = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("هل أنت متأكد من حذف هذا المنشور؟")) {
      try {
        await deletePost(postId).unwrap();
        navigate("/community");
      } catch (err) {
        alert("فشل في حذف المنشور");
        console.error(err);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("هل أنت متأكد من حذف التعليق؟")) {
      try {
        await deleteComment({ postId, commentId }).unwrap();
      } catch (err) {
        alert("فشل في حذف التعليق");
        console.error(err);
      }
    }
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
        {isLoading ? (
          <p className="text-gray-500">جار التحميل...</p>
        ) : error ? (
          <p className="text-red-500">فشل في تحميل المنشور.</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-600 mb-4">
              {post.type === "question" ? "سؤال" : "منشور"}
            </p>
            <div
              className="prose max-w-none mb-4"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <p className="text-sm text-gray-500 mb-4">
              الكاتب:{" "}
              {post.author?.firstName || post.author?.lastName || "غير معروف"} |{" "}
              التاريخ: {new Date(post.createdAt).toLocaleDateString("ar-EG")}
            </p>

            {isPostAuthor && (
              <div className="flex gap-2 mb-4">
                <Button label="تعديل" onPress={() => setIsEditOpen(true)} />
                <Button
                  label="حذف"
                  onPress={handleDeletePost}
                  type="tertiary"
                  shape="rectangle"
                  color="red"
                />
              </div>
            )}

            {/* Comments */}
            {post.comments.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">التعليقات</h2>
                <div className="space-y-4">
                  {post.comments.map((comment, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 border rounded-md p-3 text-sm text-gray-800"
                    >
                      <div className="mb-1 text-gray-600">
                        <span className="font-bold">
                          {comment.author
                            ? `${comment.author.firstName || ""} ${
                                comment.author.lastName || ""
                              }`.trim()
                            : "مجهول"}
                        </span>{" "}
                        •{" "}
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString(
                            "ar-EG"
                          )}
                        </span>
                      </div>
                      <div className="leading-relaxed">{comment.text}</div>

                      {isCommentAuthor(comment) && (
                        <div className="flex gap-2 mt-2 text-sm">
                          <button
                            className="text-red-600 hover:underline"
                            onClick={() => handleDeleteComment(comment._id)}
                          >
                            حذف
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add Comment */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3">أضف تعليقاً</h2>
              <FormWrapper
                fields={[{ name: "text", placeholder: "اكتب تعليقك هنا..." }]}
                formWidth="100%"
                buttonLabel="نشر التعليق"
                onSubmit={async (values, { resetForm }) => {
                  try {
                    await addComment({ postId, text: values.text }).unwrap();
                    resetForm();
                  } catch (err) {
                    alert("فشل نشر التعليق");
                    console.error("فشل نشر التعليق:", err);
                  }
                }}
              />
            </div>

            {/* Edit Post Modal */}
            <Modal
              open={isEditOpen}
              onClose={() => setIsEditOpen(false)}
              title="تعديل المنشور"
            >
              <FormWrapper
                initialValues={{ title: post.title, html: post.html }}
                fields={[
                  {
                    name: "title",
                    placeholder: "العنوان",
                  },
                  {
                    name: "html",
                    placeholder: "المحتوى (HTML)",
                  },
                ]}
                buttonLabel="حفظ التعديلات"
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    await updatePost({ postId, ...values }).unwrap();
                    setIsEditOpen(false);
                  } catch (err) {
                    alert("فشل تعديل المنشور");
                    console.error("فشل تعديل المنشور:", err);
                  } finally {
                    setSubmitting(false);
                  }
                }}
              />
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default CommunityPost;
