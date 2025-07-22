import React from "react";
import clsx from "clsx";
const Card = ({
  coverImage, // URL for the cover image
  title, // Card title (in Arabic)
  content, // Card subtitle (in Arabic)
  buttonLabel, // Optional button label (in Arabic)
  onButtonPress, // Function called when the button is pressed
  onPress, // Function called when the card is pressed
  className,
  cardClassname,
  textDirection,
}) => {
  return (
    <div
      onClick={onPress}
      className={clsx(
        "cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105",
        className
      )}
      dir="rtl"
    >
      {coverImage && (
        <div className="w-full aspect-w-3 aspect-h-2">
          <img
            src={coverImage}
            alt="صورة الغلاف"
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <div className={clsx("p-4", cardClassname)}>
        {title && (
          <h2 className={clsx("text-xl font-bold mb-2", textDirection)}>
            {title}
          </h2>
        )}
        {content && (
          <div
            className={clsx(
              "text-gray-700 mb-4 prose max-w-none",
              textDirection
            )}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

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
