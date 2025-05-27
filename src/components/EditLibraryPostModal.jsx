import React, { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditLibraryPostModal = ({ open, onClose, initialPost, onSubmit }) => {
  const [title, setTitle] = useState(initialPost?.title || "");
  const [sectionTitle, setSectionTitle] = useState(
    initialPost?.sections?.[0]?.title || ""
  );
  const [sectionHtml, setSectionHtml] = useState(
    initialPost?.sections?.[0]?.html || ""
  );

  useEffect(() => {
    setTitle(initialPost?.title || "");
    setSectionTitle(initialPost?.sections?.[0]?.title || "");
    setSectionHtml(initialPost?.sections?.[0]?.html || "");
  }, [initialPost]);

  const handleSave = () => {
    onSubmit({
      id: initialPost._id,
      title,
      sections: [
        {
          title: sectionTitle,
          html: sectionHtml,
        },
      ],
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="تعديل المنشور">
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
          theme="snow"
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
          style={{ minHeight: 200 }}
        />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button label="إلغاء" onPress={onClose} type="secondary" />
        <Button label="حفظ التعديلات" onPress={handleSave} type="primary" />
      </div>
    </Modal>
  );
};

export default EditLibraryPostModal;
