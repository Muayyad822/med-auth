import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { mockMedications } from '../lib/supabase';

const SearchMedication = ({ onResult }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);

    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const medication = mockMedications.find(med =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.nafdacRegNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (med.batchNumber && med.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const result = {
      medication,
      status: medication ? medication.status : 'unknown',
      confidence: medication ? (medication.status === 'authentic' ? 95 : 90) : 0,
      message: medication
        ? (medication.status === 'authentic'
          ? 'Medication found and verified as authentic'
          : 'Warning: This medication has issues')
        : 'No medication found matching your search',
      timestamp: new Date().toISOString()
    };

    onResult(result);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{t('searchMedication')}</h2>

      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, NAFDAC number, or batch number..."
            className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !searchTerm.trim()}
          className="w-full bg-green-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search size={20} />
              Search Medication
            </>
          )}
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-600">
        <p>Search examples:</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Paracetamol 500mg</li>
          <li>NAFDAC-001-2024</li>
          <li>PAR500-2024-001</li>
        </ul>
      </div>
    </div>
  );
};

export default SearchMedication;