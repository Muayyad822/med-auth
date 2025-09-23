import React from 'react';

const SafetyTips = () => {
  const tips = [
    'Always verify medications before use',
    'Buy only from licensed pharmacies',
    'Check expiry dates and packaging',
    'Report suspected counterfeits',
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Safety Tips
      </h3>
      <ul className="space-y-2 text-gray-600 flex flex-col items-center">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-green-700">•</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SafetyTips;