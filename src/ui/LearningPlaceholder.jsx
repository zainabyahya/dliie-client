import { BookOpen } from "lucide-react";

export default function LearningPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500 animate-fadeIn text-center">
      <BookOpen className="w-12 h-12 mb-4 text-primary" />
      <h2 className="text-xl font-semibold">اختر وحدة لبدء التعلم</h2>
      <p className="mt-2 text-sm">
        يرجى اختيار مجال من القائمة الجانبية لاستعراض المهارات.
      </p>
    </div>
  );
}
