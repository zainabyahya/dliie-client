import React, { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreateCommunityPostModal({
  isOpen,
  onClose,
  onSubmit,
}) {
  const [type, setType] = useState("question");
  const [title, setTitle] = useState("");
  const [contentHtml, setContentHtml] = useState("");

  const handleSave = () => {
    onSubmit({ type, title, html: contentHtml });
    // reset
    setTitle("");
    setContentHtml("");
    setType("question");
  };

  return (
    <Modal open={isOpen} onClose={onClose} title={"انشر في المجتمع"}>
      <div className="mb-3">
        <label className="block mb-1">نوع المنشور</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border px-2 py-1"
        >
          <option value="question">سؤال</option>
          <option value="post">مشاركة</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="block mb-1">العنوان</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-2 py-1"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1">المحتوى</label>
        <ReactQuill
          theme="snow"
          value={contentHtml}
          onChange={setContentHtml}
          placeholder="اكتب سؤالك أو مشاركتك هنا..."
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link"],
              ["clean"],
            ],
          }}
        />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button label="إلغاء" onPress={onClose} type="secondary" />
        <Button label="نشر" onPress={handleSave} type="primary" />
      </div>
    </Modal>
  );
}
