import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appName: "VerifyMeds",
      scanQR: "Scan QR Code",
      searchMedication: "Search Medication",
      verifyMedication: "Verify Medication",
      authentic: "AUTHENTIC",
      counterfeit: "COUNTERFEIT",
      suspicious: "SUSPICIOUS",
      unknown: "UNKNOWN",
      nafdacRegNumber: "NAFDAC Reg. No.",
      batchNumber: "Batch Number",
      expiryDate: "Expiry Date",
      manufacturer: "Manufacturer",
      medicationName: "Medication Name",
      scanResult: "Scan Result",
      reportCounterfeit: "Report Counterfeit",
      education: "Safety Education",
      signIn: "Sign In",
      signUp: "Sign Up",
      consumer: "Consumer",
      pharmacist: "Pharmacist",
      official: "NAFDAC Official"
    }
  },
  ha: {
    translation: {
      appName: "VerifyMeds",
      scanQR: "Duba QR Code",
      searchMedication: "Nemo Magani",
      verifyMedication: "Tabbatar da Magani",
      authentic: "GASKE NE",
      counterfeit: "JABU NE",
      suspicious: "DA SHAKKA",
      unknown: "BA A SANI BA",
      nafdacRegNumber: "Lambar NAFDAC",
      batchNumber: "Lambar Batch",
      expiryDate: "Ranar Karewar",
      manufacturer: "Mai Kera",
      medicationName: "Sunan Magani",
      scanResult: "Sakamakon Duba",
      reportCounterfeit: "Bayar da Jabu",
      education: "Ilimin Lafiya",
      signIn: "Shiga",
      signUp: "Yi Rajista",
      consumer: "Mai Amfani",
      pharmacist: "Pharmacist",
      official: "Jami'in NAFDAC"
    }
  },
  yo: {
    translation: {
      appName: "VerifyMeds",
      scanQR: "Scan QR Code",
      searchMedication: "Wa Oogun",
      verifyMedication: "Daju Oogun",
      authentic: "OTITO NI",
      counterfeit: "IRO NI",
      suspicious: "IFURA",
      unknown: "A KO MO",
      nafdacRegNumber: "Nọmba NAFDAC",
      batchNumber: "Nọmba Batch",
      expiryDate: "Ojo Ipari",
      manufacturer: "Oluse",
      medicationName: "Oruko Oogun",
      scanResult: "Abajade Scan",
      reportCounterfeit: "Jabo Iro",
      education: "Eko Ilera",
      signIn: "Wole",
      signUp: "Forukọsilẹ",
      consumer: "Onilo",
      pharmacist: "Pharmacist",
      official: "Oṣiṣẹ NAFDAC"
    }
  },
  ig: {
    translation: {
      appName: "VerifyMeds",
      scanQR: "Scan QR Code",
      searchMedication: "Chọọ Ọgwụ",
      verifyMedication: "Kwenye Ọgwụ",
      authentic: "EZI BU",
      counterfeit: "ASI BU",
      suspicious: "ENYO ENYO",
      unknown: "AMAGH M",
      nafdacRegNumber: "Nọmba NAFDAC",
      batchNumber: "Nọmba Batch",
      expiryDate: "Ụbọchị Njedebe",
      manufacturer: "Onye Mere",
      medicationName: "Aha Ọgwụ",
      scanResult: "Nsonaazụ Scan",
      reportCounterfeit: "Kpesa Asi",
      education: "Nkuzi Ahụike",
      signIn: "Banye",
      signUp: "Debanye Aha",
      consumer: "Onye Ọrụ",
      pharmacist: "Pharmacist",
      official: "Onye Ọrụ NAFDAC"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;