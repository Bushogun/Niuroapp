import React, { useState } from 'react';

interface SimpleSliderProps {
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

const SimpleSlider: React.FC<SimpleSliderProps> = ({ min = 1, max = 5, onChange }) => {
  const [value, setValue] = useState(min);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  const marks = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    /* flex-grow permite que ocupe el espacio central, max-w evita que se estire demasiado en ultra-wide */
    <div className="flex-grow mx-2 min-w-[120px] max-w-full md:max-w-xs lg:max-w-md md:mx-8">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="w-full h-1.5 md:h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
      />
      <div className="flex justify-between mt-1 px-1">
        {marks.map((num) => (
          <span 
            key={num} 
            className={`text-[9px] md:text-xs transition-all duration-200 ${
              value === num 
                ? 'text-blue-600 font-bold scale-110' 
                : 'text-gray-400'
            }`}
          >
            {num}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SimpleSlider;