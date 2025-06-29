import { useState } from "react";
import contactUsImg from "../assets/contact.png";

export default function ContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div dir="rtl" className="flex flex-col items-center">
      <img
        src={contactUsImg}
        alt="تواصل معنا"
        className="w-full h-full object-cover"
      />
      <main className="max-w-4xl w-full px-6 py-12 text-right">
        <h1 className="text-3xl font-bold mb-6">تواصل معنا</h1>

        <p className="text-lg leading-relaxed mb-8">
          هل لديك سؤال، ملاحظة، أو رغبة في التطوع؟ يسعدنا التواصل معك، فقط قم
          بتعبئة النموذج التالي وسنقوم بالرد في أقرب وقت ممكن.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">الاسم الكامل</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">البريد الإلكتروني</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">رسالتك</label>
            <textarea
              className="w-full p-2 border rounded-md h-32 resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
          >
            إرسال
          </button>

          {status === "success" && (
            <p className="text-green-600">تم الإرسال بنجاح!</p>
          )}
          {status === "error" && (
            <p className="text-red-600">حدث خطأ أثناء الإرسال.</p>
          )}
        </form>
      </main>
    </div>
  );
}
