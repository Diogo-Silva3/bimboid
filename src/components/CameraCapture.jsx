import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Camera, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const CameraCapture = ({ onCapture, onCancel }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setError(null);
    } catch (err) {
      console.error("Erro ao acessar a câmera:", err);
      let errorMessage = "Erro ao acessar a câmera. Verifique as permissões do seu navegador.";
      if (err.name === 'NotAllowedError') {
        errorMessage = "Acesso à câmera negado. Por favor, habilite o acesso nas configurações do seu navegador.";
      } else if (err.name === 'NotFoundError') {
        errorMessage = "Nenhuma câmera encontrada. Verifique se uma câmera está conectada e habilitada.";
      }
      setError(errorMessage);
      toast({
        title: "Erro de Câmera",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [toast]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
  }, [stream]);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
        onCapture(file);
        stopCamera();
      }, 'image/jpeg');
    }
  };
  
  const handleCancel = () => {
    stopCamera();
    onCancel();
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10"
          onClick={handleCancel}
        >
          <X className="h-5 w-5" />
        </Button>

        <h2 className="text-xl font-bold text-center mb-4">Capturar Documento</h2>
        
        <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
          {error && (
            <div className="text-center text-white p-4">
              <Camera className="w-12 h-12 mx-auto mb-4 text-red-400" />
              <p className="font-semibold">Não foi possível iniciar a câmera</p>
              <p className="text-sm text-gray-300 mt-2">{error}</p>
              <Button onClick={startCamera} className="mt-4">
                <RefreshCw className="mr-2 h-4 w-4" />
                Tentar Novamente
              </Button>
            </div>
          )}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className={`w-full h-full object-contain ${error ? 'hidden' : ''}`}
          />
          <canvas ref={canvasRef} className="hidden" />
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button
            size="lg"
            onClick={handleCapture}
            disabled={!stream}
            className="rounded-full w-20 h-20 bimbo-gradient text-white shadow-lg"
          >
            <Camera className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CameraCapture;