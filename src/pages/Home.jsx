import React, { useState } from 'react'
import Button from '../ui/Button'
import { FaPlus, FaHome, FaCog } from 'react-icons/fa';
import FormWrapper from "../ui/FormWrapper"
import { Field as FormikField, useField } from 'formik';
import QuizForm from '../ui/QuizForm';
import ToggleList from '../ui/ToggleList';
import Card from '../ui/Card';
import Dropdown from '../ui/Dropdown';
import Sidebar from '../ui/Sidebar';
import Accordion from '../ui/Accordion';
import Alert from '../ui/Alert';
import Modal from '../ui/Modal';

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
  const options = [
    { value: 'red', label: 'أحمر' },
    { value: 'green', label: 'أخضر' },
    { value: 'blue', label: 'أزرق' },
  ];
  const accordionItems = [
    {
      title: "الموضوع الأول",
      content: "هذا هو محتوى الموضوع الأول. يمكنك وضع أي معلومات هنا حسب الحاجة."
    },
    {
      title: "الموضوع الثاني",
      content: "هذا هو محتوى الموضوع الثاني. يتم عرضه عند النقر على العنوان."
    },
    {
      title: "الموضوع الثالث",
      content: "هذا هو محتوى الموضوع الثالث. يمكنك تخصيص المحتوى كما تشاء."
    }
  ];

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTab, setSelectedTab] = useState("module1");

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
  const tabs = [
    { value: "module1", label: "الوحدة الأولى" },
    { value: "module2", label: "الوحدة الثانية" },
    { value: "module3", label: "الوحدة الثالثة" },
  ];

  const handleCardPress = () => {
    console.log("تم الضغط على البطاقة!");
    // You can add navigation logic here
  };

  // Action when the button inside the card is pressed
  const handleButtonPress = (e) => {
    console.log("تم الضغط على الزر داخل البطاقة!");
  };

  const handleFormSubmit = (data) => {
    console.log("تم إرسال بيانات النموذج:", data);
  };

  const handleQuizSubmit = (values) => {
    console.log("إجابات الاختبار:", values);
  };

  return (
    <div className="flex flex-col md:flex-row" dir="rtl">
    
      <div className="w-full md:w-2/12">
        <Sidebar 
          items={tabs}
          selected={selectedTab}
          onSelect={(value) => setSelectedTab(value)}
        />
      </div>
      {/* Main content column */}
      <div className="flex-1 p-4">
        {selectedTab === "module1" &&  <Accordion items={accordionItems} />}
        {selectedTab === "module2" &&  <div className="p-6" dir="rtl">
      {/* Success alert */}
      <Alert 
        type="success" 
        message="تمت العملية بنجاح!" 
        closable={true} 
      />

      {/* Error alert */}
      <Alert 
        type="error" 
        message="حدث خطأ أثناء العملية!" 
        closable={true} 
        className="mt-4"
      />

      {/* Warning alert */}
      <Alert 
        type="warning" 
        message="يرجى الانتباه إلى هذه التحذيرات." 
        closable={false} 
        className="mt-4"
      />

      {/* Info alert */}
      <Alert 
        type="info" 
        message="هذه رسالة معلومات." 
        closable={true} 
        className="mt-4"
      />
    </div>}
        {selectedTab === "module3" &&  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6" dir="rtl">
      <Card 
        coverImage="https://picsum.photos/400/200" 
        title="الوحدة التعليمية الأولى" 
        subtitle="مقدمة في البرمجة باستخدام بايثون"
        buttonLabel="ابدأ الآن"
        onPress={handleCardPress}
        onButtonPress={handleButtonPress}
      />
      <Card
        coverImage="https://picsum.photos/400/200" 
        title="الوحدة التعليمية الثانية" 
        subtitle="أساسيات تطوير الويب"
        buttonLabel="ابدأ الآن"
        onPress={handleCardPress}
        onButtonPress={handleButtonPress}      />
         <div className="p-6" dir="rtl">
      <button 
        onClick={() => setModalOpen(true)} 
        className="px-4 py-2 bg-primary text-white rounded-md focus:outline-none"
      >
        فتح النافذة المنبثقة
      </button>

      <Modal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title="عنوان النافذة"
      >
        <p>هذا هو محتوى النافذة المنبثقة. يمكنك وضع أي محتوى هنا حسب الحاجة.</p>
      </Modal>
    </div>
    </div>
    }

      </div>

    </div>
  );
}

export default Home;
