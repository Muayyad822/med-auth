import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n/config';

import Header from './components/Header';
import QRScanner from './components/QRScanner';
import AuthModal from './components/AuthModal';
import SearchMedication from './components/SearchMedication';
import { verifyMedication } from './lib/supabase';
import Footer from './components/Footer';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import HeroSection from './components/HeroSection';
import ActionButtons from './components/ActionButtons';
import LoadingIndicator from './components/LoadingIndicator';
import VerificationView from './components/VerificationView';
import SafetyTips from './components/SafetyTips';

function App() {
  const { t, i18n } = useTranslation();
  const [showScanner, setShowScanner] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang); // persist language choice
  };

  const handleQRScan = async (qrCode) => {
    setShowScanner(false);
    setLoading(true);
    setErrorMsg(null);

    try {
      const result = await verifyMedication(qrCode);
      setVerificationResult(result);
    } catch (error) {
      console.error('Verification error:', error);
      setErrorMsg(t('verificationFailed') || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchResult = (result) => {
    setVerificationResult(result);
    setShowSearch(false);
  };

  const mockAuth = {
    signIn: async (email, password) => {
      console.log('Sign in:', email);
      return Promise.resolve({ user: { email } });
    },
    signUp: async (email, password, name, role) => {
      console.log('Sign up:', { email, name, role });
      return Promise.resolve({ user: { email, name, role } });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header
        onLanguageChange={handleLanguageChange}
        currentLanguage={i18n.language}
        onProfileClick={() => setShowAuth(true)}
      />

  <main className="flex-1 container mx-auto px-4 py-8">
        <PWAInstallPrompt />

        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <LoadingIndicator />
          </div>
        )}

        {!loading && verificationResult ? (
          <VerificationView
            result={verificationResult}
            onReset={() => setVerificationResult(null)}
          />
        ) : (
          <>
            <HeroSection />
            <ActionButtons
              onScanClick={() => setShowScanner(true)}
              onSearchClick={() => setShowSearch(true)}
            />
            {errorMsg && (
              <p className="text-center text-red-600 mt-4">{errorMsg}</p>
            )}
            <div className="grid grid-cols-1 gap-8 mb-8 text-center">
              <SafetyTips />
            </div>
          </>
        )}
      </main>

      {/* QR Scanner Modal */}
      {showScanner && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
        >
          <QRScanner
            onScan={handleQRScan}
            onClose={() => setShowScanner(false)}
          />
        </div>
      )}

      {/* Search Modal */}
      {showSearch && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
        >
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
            <SearchMedication onResult={handleSearchResult} />
            <div className="text-center mt-4">
              <button
                onClick={() => setShowSearch(false)}
                className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              >
                {t('close') || 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
          onSignIn={mockAuth.signIn}
          onSignUp={mockAuth.signUp}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
