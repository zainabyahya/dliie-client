// Button.js
import React from 'react';

const Button = ({
  label,
  onPress,
  type = 'primary',     // 'primary', 'secondary', or 'tertiary'
  color,                // Custom color override (a valid CSS color string)
  width = 'auto',       // Any valid CSS width (e.g., "50px", "100%")
  shape = 'rectangle',  // 'rectangle' or 'rounded'
  icon,                 // Optional icon (React element)
  loading = false,      // Loading state
  htmlType = "button",  // "button" or "submit"
}) => {
  // Base classes for layout, typography, and transition
  const baseClasses = "flex items-center justify-center px-4 py-2 font-medium transition-colors duration-200 focus:outline-none";
  let typeClasses = "";
  if (type === 'primary') {
    typeClasses = "bg-primary text-white hover:opacity-80";
  } else if (type === 'secondary') {
    typeClasses = "border border-primary text-primary bg-transparent hover:opacity-80";
  } else if (type === 'tertiary') {
    typeClasses = "text-primary bg-transparent hover:underline";
    shape = 'rectangle';
  }

  // Determine shape classes and inline shape styles
  let shapeClass = "";
  let customShapeStyle = {};
  if (shape === 'rectangle') {
    shapeClass = "rounded-md";
  } else if (shape === 'rounded') {
    shapeClass = "";
    if (typeof width === 'number') {
      customShapeStyle.borderRadius = `${width / 2}px`;
      customShapeStyle.height = `${width}px`;
    } else if (typeof width === 'string' && width.endsWith('px')) {
      const num = parseInt(width);
      customShapeStyle.borderRadius = `${num / 2}px`;
      customShapeStyle.height = width;
    } else {
      customShapeStyle.borderRadius = '50%';
      customShapeStyle.height = width;
    }
  }

  const classes = `${baseClasses} ${typeClasses} ${shapeClass}`;
  let customStyles = { width, ...customShapeStyle };

  if (color) {
    if (type === 'primary') {
      customStyles.backgroundColor = color;
    } else if (type === 'secondary') {
      customStyles.borderColor = color;
      customStyles.color = color;
    } else if (type === 'tertiary') {
      customStyles.color = color;
    }
  }

  return (
    <button
      type={htmlType}
      dir="rtl"  // Set right-to-left alignment for Arabic content
      className={classes}
      style={customStyles}
      onClick={onPress}
      disabled={loading}
    >
      {loading ? (
        <div className="animate-spin border-2 border-t-2 border-t-white border-gray-200 rounded-full w-5 h-5"></div>
      ) : (
        <>
          {icon && <span className={`${label ? "ml-2" : ""} flex items-center`}>{icon}</span>}
          {label}
        </>
      )}
    </button>
  );
};

export default Button;
