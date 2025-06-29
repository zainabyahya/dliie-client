import { Inbox } from "lucide-react";

export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500 animate-fadeIn">
      <Inbox className="w-12 h-12 mb-4" />
      <h2 className="text-xl font-semibold">لا توجد بيانات لعرضها</h2>
      <p className="mt-2 text-base">
        {message || "لم يتم العثور على محتوى في هذه الصفحة."}
      </p>
    </div>
  );
}
