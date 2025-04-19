// src/pages/Assessment.jsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../ui/Button";
import {
  useGetQuestionnairesQuery,
  useSubmitAssessmentMutation,
} from "../services/api";

const Assessment = () => {
  // 1) Fetch all questionnaires (your API slice exports useGetQuestionnairesQuery)
  const {
    data: questionnaires,
    isLoading,
    isError,
  } = useGetQuestionnairesQuery();

  // grab the first (or pick by ID if you prefer)
  const questionnaire = Array.isArray(questionnaires)
    ? questionnaires[0]
    : questionnaires;

  // 2) mutation hook to save the result
  const [submitAssessment] = useSubmitAssessmentMutation();

  // 3) local state
  const userId = useSelector((s) => s.auth?.user?._id);
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 = show intro
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  // once questionnaire arrives, init answers array
  useEffect(() => {
    if (questionnaire?.questions) {
      setAnswers(Array(questionnaire.questions.length).fill(null));
    }
  }, [questionnaire]);

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>Failed to load questionnaire</p>;
  if (!questionnaire) return <p>No questionnaire found</p>;

  // scoring → level
  const computeLevel = (score) => {
    if (score < 20) return "A1";
    if (score < 34) return "A2";
    if (score < 50) return "B1";
    if (score < 66) return "B2";
    if (score < 81) return "C1";
    return "C2";
  };

  // final submit
  const handleSubmit = async () => {
    const totalScore = answers.reduce((sum, a) => sum + (Number(a) || 0), 0);
    const level = computeLevel(totalScore);
    setResult({ totalScore, level });

    // if logged in, persist
    if (userId) {
      const responses = questionnaire.questions.map((q, i) => {
        const score = Number(answers[i]) || 0;
        const opt = q.options.find((o) => o.score === score) || {};
        return {
          questionId: q._id,
          selectedOption: { text: opt.text || "", score },
        };
      });
      try {
        await submitAssessment({
          user: userId,
          questionnaire: questionnaire._id,
          responses,
        }).unwrap();
      } catch (err) {
        console.error("Save failed:", err);
      }
    }
  };

  // --- RENDER ---

  // 1) intro
  if (currentIndex < 0) {
    return (
      <div
        className="h-full flex-1  p-6 flex items-center justify-center"
        dir="rtl"
      >
        <div className="max-w-lg p-6 bg-white rounded shadow text-center flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">{questionnaire.title}</h1>
          <p className="mb-6">{questionnaire.description}</p>
          <Button
            label="ابدأ التقييم"
            onPress={() => setCurrentIndex(0)}
            type="primary"
            width="50%"
          />
        </div>
      </div>
    );
  }

  // 2) result
  if (result) {
    return (
      <div
        className="h-full flex-1 p-6 flex flex-col items-center justify-center"
        dir="rtl"
      >
        <div className="max-w-lg min-w-96 p-6 bg-white rounded shadow text-center  flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">نتيجتك</h2>
          <p className="mb-2">
            الدرجة الكلية: <strong>{result.totalScore}</strong>
          </p>
          <p className="mb-4">
            المستوى: <strong>{result.level}</strong>
          </p>
          <Button
            label="إعادة التقييم"
            onPress={() => {
              setResult(null);
              setAnswers(Array(questionnaire.questions.length).fill(null));
              setCurrentIndex(0);
            }}
            type="secondary"
            width="50%"
          />
        </div>
      </div>
    );
  }

  // 3) question flow
  const q = questionnaire.questions[currentIndex];
  return (
    <div
      className="h-full flex-1  p-6 flex items-center justify-center"
      dir="rtl"
    >
      <div className="max-w-xl w-full p-6 bg-white rounded shadow">
        <h3 className="text-xl mb-2 text-center">
          سؤال {currentIndex + 1} من {questionnaire.questions.length}
        </h3>
        <p className="mb-4 text-xl font-bold">{q.text}</p>
        {q.options.map((opt, idx) => (
          <label key={idx} className="block mb-2 cursor-pointer">
            <input
              type="radio"
              checked={answers[currentIndex] === opt.score}
              onChange={() => {
                const a = [...answers];
                a[currentIndex] = opt.score;
                setAnswers(a);
              }}
              className="form-radio text-primary ml-2"
            />
            <span className="text-lg">{opt.text}</span>
          </label>
        ))}
        <div className="flex justify-between mt-6">
          {currentIndex > 0 ? (
            <Button
              label="السابق"
              onPress={() => setCurrentIndex((i) => i - 1)}
              type="secondary"
              width="45%"
            />
          ) : (
            <div style={{ width: "45%" }} />
          )}
          {currentIndex < questionnaire.questions.length - 1 ? (
            <Button
              label="التالي"
              onPress={() => setCurrentIndex((i) => i + 1)}
              type="primary"
              width="45%"
            />
          ) : (
            <Button
              label="إرسال"
              onPress={handleSubmit}
              type="primary"
              width="45%"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
