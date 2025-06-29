import privacyPolicyImg from "../assets/privacy.png";

export default function PrivacyPolicyPage() {
  return (
    <div dir="rtl" className="flex flex-col items-center">
      {/* Hero Image */}
      <img
        src={privacyPolicyImg}
        alt="سياسة الخصوصية"
        className="w-full h-full  object-cover "
      />

      <main className="max-w-4xl w-full px-6 py-12 space-y-6 text-right">
        <h1 className="text-3xl font-bold">سياسة الخصوصية</h1>

        <p className="text-lg leading-relaxed">
          نلتزم بحماية خصوصيتك. لا يتم جمع أي بيانات شخصية إلا بموافقتك، مثل
          نتائج التقييم أو بيانات تسجيل الدخول إن قمت بإنشاء حساب.
        </p>

        <p className="text-lg leading-relaxed">
          جميع البيانات محفوظة بشكل آمن، وتُستخدم فقط لتحسين تجربتك داخل المنصة.
          لن نقوم بمشاركة بياناتك مع أي طرف ثالث دون إذنك.
        </p>

        <p className="text-lg leading-relaxed">
          يمكنك استخدام المنصة كضيف دون تسجيل، ولن يتم حفظ أي بيانات عنك. إذا
          كان لديك أي استفسار، يمكنك التواصل معنا من خلال صفحة "تواصل معنا".
        </p>
      </main>
    </div>
  );
}
