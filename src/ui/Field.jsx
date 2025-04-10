// Field.js
import React from "react";
import { useField } from "formik";

const Field = ({
  name,
  placeholder = "",
  borderColor = "border-gray-300",
  ...props
}) => {
  const [field, meta] = useField(name);

  return (
    <div className="my-3">
      <input
        {...field}
        {...props}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-md border ${borderColor} focus:outline-none focus:ring-2 focus:ring-primary`}
      />
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default Field;
