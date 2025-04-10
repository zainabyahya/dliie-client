// Assessment.js
import React, { useState } from "react";
import Button from "../ui/Button";

const questions = [
  {
    id: 1,
    questionText: "ما هو تقييمك للمهارات الرقمية لديك؟",
    options: ["0", "1", "2", "3", "4"],
  },
  {
    id: 2,
    questionText: "ما هو تقييمك لاستخدام التكنولوجيا في التدريس؟",
    options: ["0", "1", "2", "3", "4"],
  },
  {
    id: 3,
    questionText: "ما مدى رضاك عن الموارد الرقمية المتاحة لديك؟",
    options: ["0", "1", "2", "3", "4"],
  },
];

const Assessment = () => {
  // Track the current question index and store answers.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const currentQuestion = questions[currentQuestionIndex];

  // Update answer for the current question.
  const handleAnswerChange = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);
  };

  // Navigate to next question (within bounds).
  const handleNext = () => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };

  // Navigate to previous question (within bounds).
  const handleBack = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  // Handle form submission.
  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    // Here you could send the answers to an API for further processing.
  };

  return (
    <div
      className="h-full p-6 flex flex-1 justify-center items-center"
      dir="rtl"
    >
      <div className="max-w-xl min-w-lg mx-auto  p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">التقييم الذاتي</h2>
        <p className="mb-4 text-center">
          السؤال {currentQuestionIndex + 1} من {questions.length}
        </p>
        <p className="text-xl mb-4">{currentQuestion.questionText}</p>
        <div className="mb-6">
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="mb-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value={option}
                  name={`question-${currentQuestion.id}`}
                  checked={answers[currentQuestionIndex] === option}
                  onChange={() => handleAnswerChange(option)}
                  className="form-radio text-primary ml-2"
                />
                <span>{option}</span>
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {currentQuestionIndex > 0 ? (
            <Button
              label="السؤال السابق"
              onPress={handleBack}
              type="secondary"
              shape="rectangle"
              width="45%"
            />
          ) : (
            <div></div>
          )}
          {currentQuestionIndex < questions.length - 1 ? (
            <Button
              label="السؤال التالي"
              onPress={handleNext}
              type="primary"
              shape="rectangle"
              width="45%"
            />
          ) : (
            <Button
              label="إرسال التقييم"
              onPress={handleSubmit}
              type="primary"
              shape="rectangle"
              width="45%"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
