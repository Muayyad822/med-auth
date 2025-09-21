import React from 'react';
import { Shield, Globe, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  onLanguageChange: (lang: string) => void;
  currentLanguage: string;
  onProfileClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onLanguageChange, 
  currentLanguage, 
  onProfileClick 
}) => {
  const { t } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ha', name: 'Hausa' },
    { code: 'yo', name: 'Yorùbá' },
    { code: 'ig', name: 'Igbo' }
  ];

  return (
    <header className="bg-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <Shield size={32} className="text-white" />
            <div>
              <h1 className="text-xl font-bold">{t('appName')}</h1>
              <p className="text-green-100 text-sm">Nigerian Medication Authentication</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <select
                value={currentLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="bg-green-600 border border-green-500 rounded-lg px-3 py-2 text-white appearance-none cursor-pointer hover:bg-green-600 transition-colors"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code} className="bg-green-700">
                    {lang.name}
                  </option>
                ))}
              </select>
              <Globe size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Profile Button */}
            <button
              onClick={onProfileClick}
              className="bg-green-600 hover:bg-green-500 p-2 rounded-lg transition-colors"
            >
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};