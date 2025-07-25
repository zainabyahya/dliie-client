import React, { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreateLibraryPostModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [sections, setSections] = useState([{ title: "", html: "" }]);

  // Add a new section
  const handleAddSection = () => {
    setSections((prev) => [...prev, { title: "", html: "" }]);
  };

  // Remove a section by index
  const handleRemoveSection = (idx) => {
    setSections((prev) => prev.filter((_, i) => i !== idx));
  };

  // Update section title or html
  const handleSectionChange = (idx, field, value) => {
    setSections((prev) =>
      prev.map((section, i) =>
        i === idx ? { ...section, [field]: value } : section
      )
    );
  };

  // Validate and submit
  const handleSave = () => {
    const nonEmptySections = sections.filter(
      (s) => s.title.trim() && s.html.trim()
    );
    if (!title.trim() || nonEmptySections.length === 0) {
      alert("الرجاء إدخال عنوان المنشور وكل الأقسام بشكل صحيح.");
      return;
    }
    onSubmit({
      title: title.trim(),
      sections: nonEmptySections,
    });
    setTitle("");
    setSections([{ title: "", html: "" }]);
  };

  // Reset on close
  const handleModalClose = () => {
    setTitle("");
    setSections([{ title: "", html: "" }]);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleModalClose}
      title="إضافة منشور إلى المكتبة"
    >
      <div className="mb-3">
        <label className="block mb-1">عنوان المنشور</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-2 py-1"
        />
      </div>

      {/* SCROLLABLE SECTIONS CONTAINER */}
      <div
        className="overflow-y-auto max-h-96 mb-4 pr-1"
        style={{ direction: "rtl" }}
      >
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="mb-6 border rounded p-3 relative bg-gray-50"
          >
            {sections.length > 1 && (
              <button
                className="absolute top-2 left-2 text-red-600"
                onClick={() => handleRemoveSection(idx)}
                title="حذف القسم"
                type="button"
              >
                ×
              </button>
            )}
            <div className="mb-3">
              <label className="block mb-1">عنوان القسم</label>
              <input
                type="text"
                value={section.title}
                onChange={(e) =>
                  handleSectionChange(idx, "title", e.target.value)
                }
                className="w-full border px-2 py-1"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1">المحتوى</label>
              <ReactQuill
                value={section.html}
                onChange={(val) => handleSectionChange(idx, "html", val)}
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
          </div>
        ))}
      </div>

      <div className="mb-4 flex justify-end">
        <Button
          label="إضافة قسم جديد"
          onPress={handleAddSection}
          type="secondary"
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button label="إلغاء" onPress={handleModalClose} type="secondary" />
        <Button label="نشر" onPress={handleSave} type="primary" />
      </div>
    </Modal>
  );
}
