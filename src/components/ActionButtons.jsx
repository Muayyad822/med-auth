import React from 'react';
import { QrCode, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ActionButtons = ({ onScanClick, onSearchClick }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
      <button onClick={onScanClick} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group">
        <QrCode size={48} className="mx-auto text-green-700 mb-4 group-hover:scale-110 transition-transform" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('scanQR')}</h3>
        <p className="text-gray-600">
          Use your camera to scan medication QR codes for instant verification
        </p>
      </button>

      <button onClick={onSearchClick} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group">
        <Search size={48} className="mx-auto text-green-700 mb-4 group-hover:scale-110 transition-transform" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('searchMedication')}</h3>
        <p className="text-gray-600">
          Search by name, NAFDAC number, or batch number
        </p>
      </button>
    </div>
  );
};

export default ActionButtons;