import React, { useState, useEffect } from 'react';
import { QrCode, Search, BookOpen, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './i18n/config';

import { Header } from './components/Header';
import { QRScanner } from './components/QRScanner';
import { MedicationCard } from './components/MedicationCard';
import { AuthModal } from './components/AuthModal';
import { SearchMedication } from './components/SearchMedication';
import { VerificationResult } from './types/medication';
import { verifyMedication } from './lib/supabase';

function App() {
  const { t, i18n } = useTranslation();
  const [showScanner, setShowScanner] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Install PWA prompt
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleQRScan = async (qrCode: string) => {
    setShowScanner(false);
    setLoading(true);
    
    try {
      const result = await verifyMedication(qrCode);
      setVerificationResult(result);
    } catch (error) {
      console.error('Verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchResult = (result: VerificationResult) => {
    setVerificationResult(result);
    setShowSearch(false);
  };

  const installPWA = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const mockAuth = {
    signIn: async (email: string, password: string) => {
      console.log('Sign in:', email);
      // Mock authentication
    },
    signUp: async (email: string, password: string, name: string, role: string) => {
      console.log('Sign up:', { email, name, role });
      // Mock registration
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onLanguageChange={handleLanguageChange}
        currentLanguage={i18n.language}
        onProfileClick={() => setShowAuth(true)}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Install PWA Prompt */}
        {showInstallPrompt && (
          <div className="mb-6 bg-green-700 text-white p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Install {t('appName')}</h3>
              <p className="text-sm text-green-100">
                Get the full app experience on your device
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={installPWA}
                className="bg-white text-green-700 px-4 py-2 rounded font-semibold hover:bg-green-50 transition-colors"
              >
                Install
              </button>
              <button
                onClick={() => setShowInstallPrompt(false)}
                className="text-green-100 hover:text-white px-4 py-2"
              >
                Later
              </button>
            </div>
          </div>
        )}

        {/* Hero Section */}
        {!verificationResult && (
          <div className="text-center mb-8">
            <Shield size={64} className="mx-auto text-green-700 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {t('verifyMedication')}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Protect yourself and your family from counterfeit medications. 
              Scan QR codes or search the NAFDAC database to verify authenticity.
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
            <span className="ml-3 text-gray-600">Verifying medication...</span>
          </div>
        )}

        {/* Verification Result */}
        {verificationResult && !loading && (
          <div className="mb-8">
            <MedicationCard result={verificationResult} />
            
            {/* New Verification Button */}
            <div className="text-center mt-6">
              <button
                onClick={() => setVerificationResult(null)}
                className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Verify Another Medication
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!verificationResult && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            {/* QR Scanner */}
            <button
              onClick={() => setShowScanner(true)}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
            >
              <QrCode size={48} className="mx-auto text-green-700 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('scanQR')}</h3>
              <p className="text-gray-600">
                Use your camera to scan medication QR codes for instant verification
              </p>
            </button>

            {/* Search */}
            <button
              onClick={() => setShowSearch(true)}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
            >
              <Search size={48} className="mx-auto text-green-700 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('searchMedication')}</h3>
              <p className="text-gray-600">
                Search by name, NAFDAC number, or batch number
              </p>
            </button>

            {/* Education */}
            {/* <button className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group">
              <BookOpen size={48} className="mx-auto text-green-700 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('education')}</h3>
              <p className="text-gray-600">
                Learn how to identify counterfeit medications and stay safe
              </p>
            </button> */}
          </div>
        )}

        {/* Features Grid */}
        {!verificationResult && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-8 text-center">
            {/* Statistics */}
            {/* <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Verification Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">95%</div>
                  <div className="text-sm text-gray-600">Authentic</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-700">5%</div>
                  <div className="text-sm text-gray-600">Counterfeit</div>
                </div>
              </div>
            </div> */}

            {/* Quick Tips */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Safety Tips
              </h3>
              <ul className="space-y-2 text-gray-600 flex flex-col items-center">
                <li className="flex items-start gap-2">
                  <span className="text-green-700">•</span>
                  Always verify medications before use
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-700">•</span>
                  Buy only from licensed pharmacies
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-700">•</span>
                  Check expiry dates and packaging
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-700">•</span>
                  Report suspected counterfeits
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* QR Scanner Modal */}
      {showScanner && (
        <QRScanner
          onScan={handleQRScan}
          onClose={() => setShowScanner(false)}
        />
      )}

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <SearchMedication onResult={handleSearchResult} />
            <div className="text-center mt-4">
              <button
                onClick={() => setShowSearch(false)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSignIn={mockAuth.signIn}
        onSignUp={mockAuth.signUp}
      />

      {/* Footer */}
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
            Built by Team X © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;