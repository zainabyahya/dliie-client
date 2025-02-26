// Card.js
import React from 'react';

const Card = ({ 
  coverImage,      // URL for the cover image
  title,           // Card title (in Arabic)
  subtitle,        // Card subtitle (in Arabic)
  buttonLabel,     // Optional button label (in Arabic)
  onButtonPress,   // Function called when the button is pressed
  onPress,         // Function called when the card is pressed
  className = ""
}) => {
  return (
    <div 
      onClick={onPress} 
      className={`cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 ${className}`}
      dir="rtl"  // Ensure RTL alignment for Arabic
    >
      {coverImage && (
        <img 
          src={coverImage} 
          alt="صورة الغلاف" 
          className="w-full h-48 object-cover" 
        />
      )}
      <div className="p-4">
        {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
        {subtitle && <p className="text-gray-700 mb-4">{subtitle}</p>}
        {buttonLabel && onButtonPress && (
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent card onClick from triggering
              onButtonPress();
            }}
            className="px-4 py-2 bg-primary text-white rounded-md focus:outline-none transition-colors duration-300 hover:bg-primary-dark"
          >
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
