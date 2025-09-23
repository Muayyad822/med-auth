import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const installPWA = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
  };

  return { deferredPrompt, installPWA };
};

const PWAInstallPrompt = () => {
  const { t } = useTranslation();
  const { deferredPrompt, installPWA } = usePWAInstall();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (deferredPrompt) setIsVisible(true);
  }, [deferredPrompt]);

  if (!isVisible) return null;

  return (
    <div className="mb-6 bg-green-700 text-white p-4 rounded-lg flex items-center justify-between">
      <div>
        <h3 className="font-semibold">Install {t('appName')}</h3>
        <p className="text-sm text-green-100">Get the full app experience on your device</p>
      </div>
      <div className="flex gap-2">
        <button onClick={installPWA} className="bg-white text-green-700 px-4 py-2 rounded font-semibold hover:bg-green-50 transition-colors">Install</button>
        <button onClick={() => setIsVisible(false)} className="text-green-100 hover:text-white px-4 py-2">Later</button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;