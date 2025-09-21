import { createClient } from '@supabase/supabase-js';

// These would be replaced with actual Supabase credentials
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock data for demonstration
export const mockMedications = [
  {
    id: '1',
    nafdacRegNumber: 'NAFDAC-001-2024',
    name: 'Paracetamol 500mg',
    manufacturer: 'Nigerian Pharma Ltd',
    batchNumber: 'PAR500-2024-001',
    expiryDate: '2026-12-31',
    qrCode: 'MOCK_QR_1',
    status: 'authentic' as const,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2', 
    nafdacRegNumber: 'NAFDAC-002-2024',
    name: 'Amoxicillin 250mg',
    manufacturer: 'West African Drugs',
    batchNumber: 'AMX250-2024-002',
    expiryDate: '2025-08-15',
    qrCode: 'MOCK_QR_2',
    status: 'authentic' as const,
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02'
  },
  {
    id: '3',
    nafdacRegNumber: 'FAKE-003-2024',
    name: 'Counterfeit Aspirin',
    manufacturer: 'Unknown Manufacturer',
    batchNumber: 'ASP100-FAKE-001',
    expiryDate: '2025-01-01',
    qrCode: 'FAKE_QR_1',
    status: 'counterfeit' as const,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03'
  }
];

export const verifyMedication = async (qrCode: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const medication = mockMedications.find(med => med.qrCode === qrCode);
  
  if (!medication) {
    return {
      medication: null,
      status: 'unknown' as const,
      confidence: 0,
      message: 'Medication not found in NAFDAC database',
      timestamp: new Date().toISOString()
    };
  }

  return {
    medication,
    status: medication.status,
    confidence: medication.status === 'authentic' ? 95 : 
                 medication.status === 'counterfeit' ? 90 : 70,
    message: medication.status === 'authentic' 
      ? 'This medication is verified as authentic by NAFDAC'
      : medication.status === 'counterfeit'
      ? 'WARNING: This medication appears to be counterfeit'
      : 'This medication requires further verification',
    timestamp: new Date().toISOString()
  };
};