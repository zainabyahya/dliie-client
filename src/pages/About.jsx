import whoAreWeImg from "../assets/about.png";

export default function AboutPage() {
  return (
    <div dir="rtl" className="flex flex-col items-center">
      {/* Hero Image */}
      <img
        src={whoAreWeImg}
        alt="من نحن"
        className="w-full h-full object-cover"
      />

      <main className="max-w-4xl w-full px-6 py-12 space-y-6 text-right">
        <h1 className="text-3xl font-bold">من نحن</h1>

        <p className="text-lg leading-relaxed">
          نحن مبادرة "الثقافة الرقمية للمعلمين العراقيين"، نهدف إلى سد فجوة
          المهارات الرقمية من خلال منصة تعليمية باللغة العربية، مصممة خصيصًا
          للمعلمين في العراق، وتستند إلى إطار DigCompEdu الأوروبي.
        </p>

        <p className="text-lg leading-relaxed">
          توفر المنصة أدوات تقييم ذاتي، وحدات تعلم تفاعلية، ومكتبة موارد، ومساحة
          تواصل مجتمعي، وتُمكّن المعلمين من تتبع تقدمهم وتطوير مهاراتهم الرقمية
          بشكل مستمر.
        </p>

        <p className="text-lg leading-relaxed">
          نؤمن بأن تمكين المعلم هو أساس تحسين جودة التعليم، وتحقيق التكافؤ
          الرقمي، وبناء جيل مستعد للمستقبل.
        </p>
      </main>
    </div>
  );
}
