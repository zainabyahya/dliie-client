import React from 'react';
import { Formik, Form, Field as FormikField } from 'formik';
import Button from './Button';

const QuizForm = ({ questions, onSubmit, formWidth = "100%" }) => {
  // Build initialValues from the questions array using each question's id.
  const initialValues = questions.reduce((acc, question) => {
    acc[question.id] = ''; // default answer is an empty string
    return acc;
  }, {});

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form 
          className="space-y-6 p-6 border rounded-md" 
          style={{ width: formWidth }} 
          dir="rtl"  // Set right-to-left alignment for Arabic
        >
          {questions.map((q, index) => (
            <div key={q.id} className="space-y-2">
              <div className="font-semibold">
                {index + 1}. {q.question}
              </div>
              {q.type === 'text' && (
                <FormikField name={q.id}>
                  {({ field, meta }) => (
                    <div>
                      <input
                        {...field}
                        type="text"
                        placeholder="أدخل إجابتك..."
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      {meta.touched && meta.error && (
                        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
                      )}
                    </div>
                  )}
                </FormikField>
              )}
              {q.type === 'multiple-choice' && (
                <div className="space-y-1">
                  {q.options.map((option, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <FormikField name={q.id} type="radio" value={option}>
                        {({ field }) => (
                          <input
                            {...field}
                            type="radio"
                            checked={field.value === option}
                            className="form-radio text-primary" 
                          />
                        )}
                      </FormikField>
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Button
            label="إرسال الاختبار"
            htmlType="submit"
            type="primary"
            shape="rectangle"
            width="100%"
            loading={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};

export default QuizForm;
