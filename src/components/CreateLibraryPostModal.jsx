import React, { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreateLibraryPostModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionHtml, setSectionHtml] = useState("");

  const handleSave = () => {
    onSubmit({
      title,
      sections: [{ title: sectionTitle, html: sectionHtml }],
    });

    // Reset fields
    setTitle("");
    setSectionTitle("");
    setSectionHtml("");
  };

  return (
    <Modal open={isOpen} onClose={onClose} title="إضافة منشور إلى المكتبة">
      <div className="mb-3">
        <label className="block mb-1">عنوان المنشور</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-2 py-1"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">عنوان القسم</label>
        <input
          type="text"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          className="w-full border px-2 py-1"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">المحتوى</label>
        <ReactQuill
          value={sectionHtml}
          onChange={setSectionHtml}
          placeholder="اكتب محتوى القسم هنا..."
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
        <Button
          label="إلغاء"
          onPress={onClose}
          type="secondary"
          color={undefined}
          icon={undefined}
        />
        <Button
          label="نشر"
          onPress={handleSave}
          type="primary"
          color={undefined}
          icon={undefined}
        />
      </div>
    </Modal>
  );
}
