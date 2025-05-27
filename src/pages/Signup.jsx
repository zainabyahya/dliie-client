import React from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Field from "../ui/Field";
import Button from "../ui/Button";
import { useSignupMutation } from "../services/api";
import { setCredentials } from "../slices/authSlice";

const Signup = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
    if (values.password !== values.confirmPassword) {
      return setErrors({ confirmPassword: "كلمتا المرور غير متطابقتين" });
    }
    try {
      const user = await signup(values).unwrap();
      dispatch(setCredentials(user));
      navigate("/"); // or dashboard
    } catch (err) {
      console.error(err);
      setErrors({ general: err?.data?.message || "Signup failed" });
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
        <h1 className="text-2xl font-bold mb-4 text-center">إنشاء حساب</h1>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting, errors }) => (
            <Form>
              {errors.general && (
                <p className="text-red-500 mb-2">{errors.general}</p>
              )}
              <Field
                name="firstName"
                type="text"
                placeholder="الاسم الاول"
                className="mb-4"
              />
              <Field
                name="lastName"
                type="text"
                placeholder="الاسم الاخير"
                className="mb-4"
              />
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
              <Field
                name="confirmPassword"
                type="password"
                placeholder="تأكيد كلمة المرور"
                className="mb-4"
              />
              <Button
                label="إنشاء الحساب"
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
