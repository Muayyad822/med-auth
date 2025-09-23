import React, { useRef, useEffect, useState } from 'react';
import { Camera, X, Flashlight, FlashlightOff } from 'lucide-react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { useTranslation } from 'react-i18next';

const QRScanner = ({ onScan, onClose }) => {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const [isScanning, setIsScanning] = useState(false);
  const [hasFlashlight, setHasFlashlight] = useState(false);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    startScanner();
    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    try {
      setIsScanning(true);

      const constraints = {
        video: {
          facingMode: 'environment', // Use back camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);

      // Check if flashlight is available
      const track = mediaStream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      setHasFlashlight('torch' in capabilities);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;

        codeReader.current.decodeFromVideoDevice(
          undefined,
          videoRef.current,
          (result, error) => {
            if (result) {
              onScan(result.getText());
              stopScanner();
            }
          }
        );
      }
    } catch (error) {
      console.error('Error starting scanner:', error);
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (codeReader.current && typeof codeReader.current.reset === 'function') {
      codeReader.current.reset();
    }
    setIsScanning(false);
  };

  const toggleFlashlight = async () => {
    if (stream && hasFlashlight) {
      const track = stream.getVideoTracks()[0];
      try {
        await track.applyConstraints({
          advanced: [{ torch: !flashlightOn }]
        });
        setFlashlightOn(!flashlightOn);
      } catch (error) {
        console.error('Error toggling flashlight:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-black/50">
        <h2 className="text-white text-lg font-semibold">{t('scanQR')}</h2>
        <div className="flex gap-2">
          {hasFlashlight && (
            <button
              onClick={toggleFlashlight}
              className="p-2 text-white hover:bg-white/20 rounded-lg"
            >
              {flashlightOn ? <FlashlightOff size={20} /> : <Flashlight size={20} />}
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white/20 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Scanning Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Scanning frame */}
            <div className="w-64 h-64 border-2 border-white rounded-lg relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-500"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-500"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-500"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-500"></div>

              {/* Scanning line animation */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-full h-1 bg-green-500 opacity-75 animate-pulse"></div>
              </div>
            </div>

            {/* Instructions */}
            <p className="text-white text-center mt-4 px-4">
              Position QR code within the frame
            </p>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="p-4 bg-black/50 text-center">
        <div className="flex items-center justify-center gap-2 text-white">
          <Camera size={20} />
          <span>{isScanning ? 'Scanning...' : 'Starting camera...'}</span>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;