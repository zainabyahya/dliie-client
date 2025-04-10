import React from "react";
import Button from "../ui/Button";

const HeroSection = ({ onCtaClick }) => {
  return (
    <section className="relative">
      {/* Blurred background image */}
      <img
        src={require("../assets/hero.jpg")}
        alt="Hero"
        className="w-full h-auto filter blur-sm"
      />
      {/* Optional dark overlay for better contrast */}
      <div className="absolute inset-0 bg-gray-900 opacity-40"></div>
      {/* Text and button overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <h1 className="p-2 text-3xl md:text-4xl font-bold text-white text-center mb-4">
          مبادرة الثقافة الرقمية للمعلمين العراقيين (DLIIE)
        </h1>
        <p className="text-lg text-white mb-6">
          تمكين المعلمين بالمهارات الرقمية الأساسية
        </p>
        <Button
          label="خذ التقييم"
          onPress={onCtaClick}
          type="primary"
          shape="rectangle"
        />
      </div>
    </section>
  );
};

export default HeroSection;
