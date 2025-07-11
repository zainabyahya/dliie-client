import React from "react";
import { useSelector } from "react-redux";
import { useGetAssessmentByUserQuery } from "../services/api";
import { useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";
import ErrorState from "../ui/ErrorState";
import EmptyState from "../ui/EmptyState";

const AssessmentResult = () => {
  const navigate = useNavigate();
  const userId = useSelector((s) => s.auth.user?._id);
  const {
    data: { assessment } = {},
    isLoading,
    isError,
  } = useGetAssessmentByUserQuery(userId, {
    skip: !userId,
  });

  if (!userId) {
    return (
      <div className="p-6 text-center" dir="rtl">
        <p>يجب عليك تسجيل الدخول أولاً لرؤية نتائجك.</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
        >
          تسجيل دخول
        </button>
      </div>
    );
  }
  if (isLoading) {
    return <Loader message="جاري تحميل البيانات التعليمية..." />;
  }

  if (isError) {
    return <ErrorState message="فشل في جلب المحتوى ." />;
  }

  if (!assessment) {
    return <EmptyState message="لا توجد مواد بعد." />;
  }

  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">نتائج التقييم الذاتي</h1>
      <p className="mb-2">الدرجة الكلية: {assessment.totalScore}</p>
      <p className="mb-4">المستوى: {assessment.level}</p>
      <h2 className="text-xl font-semibold mb-2">تفاصيل إجاباتك</h2>
      <ul className="list-disc ml-6">
        {assessment.responses.map((r) => (
          <li key={r.questionId}>
            خيار: <strong>{r.selectedOption.text}</strong> (نقاط:{" "}
            {r.selectedOption.score})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssessmentResult;
