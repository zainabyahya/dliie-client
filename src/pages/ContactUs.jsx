import contactUsImg from "../assets/contact.png";

export default function ContactUsPage() {
  return (
    <div dir="rtl" className="flex flex-col items-center">
      {/* Hero Image */}
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

        <form className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">الاسم الكامل</label>
            <input type="text" className="w-full p-2 border rounded-md" />
          </div>

          <div>
            <label className="block mb-2 font-medium">البريد الإلكتروني</label>
            <input type="email" className="w-full p-2 border rounded-md" />
          </div>

          <div>
            <label className="block mb-2 font-medium">رسالتك</label>
            <textarea className="w-full p-2 border rounded-md h-32 resize-none" />
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
          >
            إرسال
          </button>
        </form>
      </main>
    </div>
  );
}
