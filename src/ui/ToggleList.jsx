import React, { useState } from 'react';

const ToggleList = () => {
  const [listItems, setListItems] = useState([]);
  const [inputText, setInputText] = useState('');

  // Add a new item to the list when the user clicks the "Add" button.
  const handleAddItem = () => {
    if (inputText.trim() !== '') {
      const newItem = {
        id: Date.now(), // simple unique id
        text: inputText,
        open: false
      };
      setListItems([...listItems, newItem]);
      setInputText('');
    }
  };

  // Toggle the "open" state of an item by id.
  const toggleItem = (id) => {
    setListItems(listItems.map(item => 
      item.id === id ? { ...item, open: !item.open } : item
    ));
  };

  return (
    <div className="p-4 border rounded-md max-w-md mx-auto" dir="rtl">
      {/* Input Section */}
      <div className="flex mb-4">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="أدخل النص"
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleAddItem}
          className="mr-2 px-4 py-2 bg-primary text-white rounded-md hover:opacity-80 transition-opacity"
        >
          إضافة
        </button>
      </div>

      {/* Toggle List */}
      <ul className="space-y-2">
        {listItems.map(item => (
          <li key={item.id} className="border rounded-md">
            {/* Toggle Header */}
            <div
              className="p-2 cursor-pointer bg-gray-100"
              onClick={() => toggleItem(item.id)}
            >
              {item.text}
            </div>
            {/* Toggled Content */}
            {item.open && (
              <div className="p-2 border-t">
                {/* Customize this content as needed */}
                <p className="text-gray-700">تفاصيل: {item.text}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToggleList;
