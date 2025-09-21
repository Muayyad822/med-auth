import React from 'react';
import { Shield, ShieldX, AlertTriangle, HelpCircle, Calendar, Building2, Hash } from 'lucide-react';
import { Medication, VerificationResult } from '../types/medication';
import { useTranslation } from 'react-i18next';

interface MedicationCardProps {
  result: VerificationResult;
}

export const MedicationCard: React.FC<MedicationCardProps> = ({ result }) => {
  const { t } = useTranslation();
  const { medication, status, confidence, message } = result;

  const getStatusIcon = () => {
    switch (status) {
      case 'authentic': return <Shield className="text-green-600" size={24} />;
      case 'counterfeit': return <ShieldX className="text-red-600" size={24} />;
      case 'suspicious': return <AlertTriangle className="text-yellow-600" size={24} />;
      default: return <HelpCircle className="text-gray-600" size={24} />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'authentic': return 'bg-green-50 border-green-200';
      case 'counterfeit': return 'bg-red-50 border-red-200';
      case 'suspicious': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusTextColor = () => {
    switch (status) {
      case 'authentic': return 'text-green-800';
      case 'counterfeit': return 'text-red-800';
      case 'suspicious': return 'text-yellow-800';
      default: return 'text-gray-800';
    }
  };

  return (
    <div className={`rounded-lg border-2 p-6 ${getStatusColor()}`}>
      {/* Status Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <h3 className={`text-xl font-bold ${getStatusTextColor()}`}>
              {t(status).toUpperCase()}
            </h3>
            <p className="text-sm text-gray-600">
              Confidence: {confidence}%
            </p>
          </div>
        </div>
        <div className="text-right text-sm text-gray-500">
          {new Date(result.timestamp).toLocaleString()}
        </div>
      </div>

      {/* Message */}
      <div className="mb-4 p-3 bg-white/50 rounded-lg">
        <p className={`font-medium ${getStatusTextColor()}`}>{message}</p>
      </div>

      {/* Medication Details */}
      {medication && (
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800">{t('medicationName')}</h4>
          <p className="text-lg font-bold text-gray-900">{medication.name}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Hash size={16} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">{t('nafdacRegNumber')}</p>
                <p className="font-semibold">{medication.nafdacRegNumber}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Building2 size={16} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">{t('manufacturer')}</p>
                <p className="font-semibold">{medication.manufacturer}</p>
              </div>
            </div>
            
            {medication.batchNumber && (
              <div className="flex items-center gap-2">
                <Hash size={16} className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">{t('batchNumber')}</p>
                  <p className="font-semibold">{medication.batchNumber}</p>
                </div>
              </div>
            )}
            
            {medication.expiryDate && (
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">{t('expiryDate')}</p>
                  <p className="font-semibold">
                    {new Date(medication.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {status === 'counterfeit' && (
        <div className="mt-6">
          <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            {t('reportCounterfeit')}
          </button>
        </div>
      )}
    </div>
  );
};