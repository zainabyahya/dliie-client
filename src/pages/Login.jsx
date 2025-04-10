// Login.js
import React from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import Field from "../ui/Field";
import Button from "../ui/Button";

const Login = () => {
  const initialValues = { email: "", password: "" };

  const handleSubmit = (values) => {
    console.log("Login values:", values);
    // Add your authentication logic here (e.g., API call)
  };

  return (
    <div
      className="h-full p-6 flex flex-1 justify-center items-center"
      dir="rtl"
    >
      <div className=" p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">تسجيل الدخول</h1>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
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
              <Button
                label="تسجيل الدخول"
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
          لا تملك حساباً؟{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
