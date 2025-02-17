import React from 'react';
import { Formik, Form } from 'formik';
import Field from './Field';
import Button from './Button';
import { FaPaperPlane } from 'react-icons/fa';

const FormWrapper = ({ 
  fields, 
  initialValues, 
  onSubmit, 
  buttonLabel = "إرسال", // Arabic for "Submit"
  children, 
  validationSchema,
  formWidth = "100%" // New prop to control the form width
}) => {
  // Compute initial values from fields array if not provided.
  const computedInitialValues = initialValues || fields.reduce((acc, field) => {
    acc[field.name] = field.initialValue || '';
    return acc;
  }, {});

  return (
    <Formik
      initialValues={computedInitialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form 
          className="space-y-4 p-6 border rounded-md"
          style={{ width: formWidth }}
          dir="rtl" // Set right-to-left alignment for Arabic
        >
          {fields.map((field) => (
            <Field
              key={field.name}
              name={field.name}
              placeholder={field.placeholder} // Use Arabic placeholder if provided
              type={field.type || 'text'}
              borderColor={field.borderColor || "border-gray-300"}
            />
          ))}

          {/* Render any custom Formik inputs or elements passed as children */}
          {children}

          <Button
            label={buttonLabel} // Arabic button label
            htmlType="submit"
            type="primary"
            shape="rectangle"
            icon={<FaPaperPlane />}
            width="100%"
            loading={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormWrapper;
