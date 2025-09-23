import React from 'react';
import { Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center mb-8">
      <Shield size={64} className="mx-auto text-green-700 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('verifyMedication')}</h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Protect yourself and your family from counterfeit medications. Scan QR codes or search the NAFDAC database to verify authenticity.
      </p>
    </div>
  );
};

export default HeroSection;