import React, { useState } from 'react'
import Button from '../ui/Button'
import { FaPlus, FaHome, FaCog } from 'react-icons/fa';
import FormWrapper from "../ui/FormWrapper"
import { Field as FormikField, useField } from 'formik';
import QuizForm from '../ui/QuizForm';
import ToggleList from '../ui/ToggleList';

// A custom Formik checkbox component using useField
const Checkbox = ({ name, label }) => {
  const [field, meta] = useField({ name, type: 'checkbox' });
  return (
    <div className="flex items-center">
      <input type="checkbox" {...field} className="ml-2" dir="rtl" />
      <label className="text-sm text-gray-700">{label}</label>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
};

function Home() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // محاكاة عملية غير متزامنة
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  const questions = [
    {
      id: "q1",
      question: "ما هي لغة البرمجة المفضلة لديك؟",
      type: "text"
    },
    {
      id: "q2",
      question: "أي إطار عمل للواجهة الأمامية تفضل؟",
      type: "multiple-choice",
      options: ["React", "Vue", "Angular", "Svelte"]
    },
    {
      id: "q3",
      question: "كم يساوي 2 + 2؟",
      type: "text"
    }
  ];

  const fields = [
    {
      name: "firstName",
      placeholder: "الاسم الأول",
      borderColor: "border-primary",
    },
    {
      name: "lastName",
      placeholder: "اسم العائلة",
      borderColor: "border-primary",
    },
    {
      name: "email",
      placeholder: "البريد الإلكتروني",
      type: "email",
      borderColor: "border-secondary",
    },
    {
      name: "password",
      placeholder: "كلمة المرور",
      type: "password",
      borderColor: "border-primary",
    },
  ];

  const handleFormSubmit = (data) => {
    console.log("تم إرسال بيانات النموذج:", data);
  };

  const handleQuizSubmit = (values) => {
    console.log("إجابات الاختبار:", values);
  };

  return (
    <div className="p-6 space-y-6" dir="rtl">
      {/* 1. Basic Action Button */}
      <Button
        label="ابدأ الآن"
        onPress={() => console.log("التنقل إلى التسجيل...")}
        type="primary"
      />

      {/* 2. Fixed-Width Secondary Button */}
      <Button
        label="إلغاء"
        onPress={() => console.log("إغلاق النافذة...")}
        type="secondary"
        width="150px"
      />

      {/* 3. Tertiary Button with Custom Color */}
      <Button
        label="اعرف المزيد"
        onPress={() => console.log("فتح التفاصيل...")}
        type="tertiary"
        color="#FF5733" 
      />

      {/* 4. Icon-Only Circular Button for Mobile or Floating Action */}
      <Button
        icon={<FaPlus />}
        onPress={() => console.log("إضافة عنصر جديد...")}
        type="primary"
        shape="rounded"  // عند غياب النص، يتم تطبيق شكل دائري كامل
        width="3rem"
      />

      {/* 5. Button with Icon and Label */}
      <Button
        label="الرئيسية"
        icon={<FaHome />}
        onPress={() => console.log("التنقل إلى الصفحة الرئيسية...")}
        type="primary"
        shape="rectangle"
      />

      {/* 6. Loading State Button */}
      <Button
        label="إرسال"
        onPress={handleSubmit}
        type="primary"
        loading={isSubmitting}
      />

      {/* 7. Square (No Rounding) Icon-Only Button */}
      <Button
        icon={<FaCog />}
        onPress={() => console.log("فتح الإعدادات...")}
        type="secondary"
        width="3rem"
      />

      {/* 7b. Square (No Rounding) Button with Label */}
      <Button
        label="الإعدادات"
        icon={<FaCog />}
        onPress={() => console.log("فتح الإعدادات...")}
        type="secondary"
      />

      {/* 8. Responsive Full-Width Button for Mobile Forms */}
      <Button
        label="المتابعة للدفع"
        onPress={() => console.log("المتابعة للدفع...")}
        type="primary"
        width="100%"
      />

      <FormWrapper 
        fields={fields} 
        onSubmit={handleFormSubmit} 
        buttonLabel="تسجيل" 
        formWidth="400px"
      >
        {/* Custom Formik input added as children */}
        <Checkbox name="terms" label="أوافق على الشروط والأحكام" />
      </FormWrapper>

      <QuizForm 
        questions={questions} 
        onSubmit={handleQuizSubmit} 
        formWidth="400px"
      />
      <ToggleList/>
    </div>
  );
}

export default Home;
