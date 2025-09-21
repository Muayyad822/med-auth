export interface Medication {
  id: string;
  nafdacRegNumber: string;
  name: string;
  manufacturer: string;
  batchNumber?: string;
  expiryDate?: string;
  qrCode?: string;
  status: 'authentic' | 'counterfeit' | 'suspicious' | 'unknown';
  createdAt: string;
  updatedAt: string;
}

export interface VerificationResult {
  medication: Medication | null;
  status: 'authentic' | 'counterfeit' | 'suspicious' | 'unknown';
  confidence: number;
  message: string;
  timestamp: string;
}

export interface User {
  id: string;
  email: string;
  role: 'consumer' | 'pharmacist' | 'official';
  name: string;
  createdAt: string;
}