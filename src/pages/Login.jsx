// src/pages/Login.jsx
import React from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Field from "../ui/Field";
import Button from "../ui/Button";
import { useLoginMutation } from "../services/api";
import { setCredentials } from "../slices/authSlice";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = { phoneNumber: "", password: "" };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
    try {
      const user = await login(values).unwrap();
      // expects your backend to return { user: {...}, token: "..." }
      dispatch(setCredentials(user));
      navigate("/"); // or wherever
    } catch (err) {
      console.error(err);
      setErrors({ general: err?.data?.message || "Login failed" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen p-6 flex justify-center items-center"
      dir="rtl"
    >
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">تسجيل الدخول</h1>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting, errors }) => (
            <Form>
              {errors.general && (
                <p className="text-red-500 mb-2">{errors.general}</p>
              )}
              <Field
                name="phoneNumber"
                type="phone"
                placeholder="رقم الهاتف"
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
