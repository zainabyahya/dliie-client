import { Send } from "lucide-react"; // You can replace with any paper plane SVG

export default function Loader({ message }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20 animate-fadeIn">
      <div className="relative">
        <Send className="w-16 h-16 text-primary animate-planeFlight" />
      </div>
      <p className="text-lg text-gray-600">
        {message || "جارٍ الإقلاع الرقمي..."}
      </p>
    </div>
  );
}
