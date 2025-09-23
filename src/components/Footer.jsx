import React from 'react'
import { Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-green-700 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield size={24} />
            <span className="text-xl font-bold">{t('appName')}</span>
          </div>
          <p className="text-green-100 mb-2">
            Protecting Nigerian consumers from counterfeit medications
          </p>
          <p className="text-sm text-green-200">
            Built by Team Nexploy © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </footer>
  )
}

export default Footer