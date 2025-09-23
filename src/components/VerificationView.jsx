import React from 'react';
import MedicationCard from './MedicationCard';

const VerificationView = ({ result, onReset }) => {
  return (
    <div className="mb-8">
      <MedicationCard result={result} />
      <div className="text-center mt-6">
        <button onClick={onReset} className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
          Verify Another Medication
        </button>
      </div>
    </div>
  );
};

export default VerificationView;