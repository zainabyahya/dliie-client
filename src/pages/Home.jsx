import React from "react";
import HeroSection from "../components/HeroSection";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import Card from "../ui/Card";
import communityImg from "../assets/community.png";
import libraryImg from "../assets/library.png";
import assessmentImg from "../assets/assess.png";

function Home() {
  const modules = [
    {
      id: 1,
      coverImage: assessmentImg,
      title: "التقييم الذاتي",
      content: "قيّم مهاراتك الرقمية وحدد نقاط القوة والضعف.",
    },
    {
      id: 2,
      coverImage: libraryImg,
      title: "المكتبة الرقمية",
      content: "اكتشف موارد تعليمية متميزة تناسب احتياجاتك.",
    },
    {
      id: 3,
      coverImage: communityImg,
      title: "المجتمع",
      content: "تواصل مع معلمين آخرين وتبادل الخبرات والمعرفة.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen" dir="rtl">
      {/* Hero Section */}
      <HeroSection />

      {/* Brief Overview Section */}
      <section className="p-8" dir="rtl">
        <div className="max-w-3xl mx-auto flex flex-col justify-center items-center gap-5">
          <p className="mb-4 text-center text-xl">
            نقدم لك منصة متكاملة تساعد المعلمين على تعزيز مهاراتهم الرقمية، مما
            يسهم في تحسين أساليب التدريس وإحداث نقلة نوعية في العملية التعليمية.
          </p>
          <Button
            label="اعرف المزيد"
            onPress={() => (window.location.href = "/about")} // Example navigation
            type="primary"
            shape="rectangle"
          />
        </div>
      </section>

      {/* Highlighted Features Cards */}
      <section className="p-8 bg-gray-100" dir="rtl">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">
            المزايا الرئيسية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modules.map((module) => (
              <Card
                key={module.id}
                coverImage={module.coverImage}
                title={module.title}
                content={module.content}
                cardClassname={" flex flex-col justify-center items-center"}
                textDirection={"text-center"}
              >
                <Button
                  label="ابدأ الوحدة"
                  onPress={() => console.log("بدء الوحدة:", module.title)}
                  type="primary"
                  shape="rectangle"
                />
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
