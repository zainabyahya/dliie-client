// Signup.js
import React from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import Field from "../ui/Field";
import Button from "../ui/Button";

const Signup = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values) => {
    console.log("Signup values:", values);
    // Add your sign-up logic here (e.g., API call)
  };

  return (
    <div
      className="h-full p-6 flex-1 flex justify-center items-center"
      dir="rtl"
    >
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">إنشاء حساب</h1>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="name"
                type="text"
                placeholder="الاسم الكامل"
                className="mb-4"
              />
              <Field
                name="email"
                type="email"
                placeholder="البريد الإلكتروني"
                className="mb-4"
              />
              <Field
                name="password"
                type="password"
                placeholder="كلمة المرور"
                className="mb-4"
              />
              <Field
                name="confirmPassword"
                type="password"
                placeholder="تأكيد كلمة المرور"
                className="mb-4"
              />
              <Button
                label="إنشاء الحساب"
                onPress={undefined}
                htmlType="submit"
                type="primary"
                shape="rectangle"
                loading={isSubmitting}
                width="100%"
              />
            </Form>
          )}
        </Formik>
        <p className="text-center mt-4">
          لديك حساب؟{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
