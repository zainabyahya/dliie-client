import { AlertTriangle } from "lucide-react";

export default function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-red-600 animate-fadeIn">
      <AlertTriangle className="w-12 h-12 mb-4" />
      <h2 className="text-xl font-bold">حدث خطأ أثناء التحميل</h2>
      <p className="mt-2 text-base text-red-500">
        {message || "يرجى المحاولة مرة أخرى لاحقًا."}
      </p>
    </div>
  );
}
