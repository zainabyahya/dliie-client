import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white p-4 w-full" dir="rtl">
      <div className="container mx-auto text-center">
        <p>© 2024 جميع الحقوق محفوظة لمنصة الكفاءة الرقمية</p>
        <div className="mt-2">
          <a href="#about" className="mx-2 hover:underline">
            حول
          </a>
          <a href="#contact" className="mx-2 hover:underline">
            اتصل بنا
          </a>
          <a href="#privacy" className="mx-2 hover:underline">
            سياسة الخصوصية
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
