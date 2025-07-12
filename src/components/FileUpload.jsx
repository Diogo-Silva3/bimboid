import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Upload, Camera, Check, AlertCircle, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CameraCapture from '@/components/CameraCapture';

const FileUpload = ({ docType, doc, onFileChange, isCompleted }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleCapture = (file) => {
    onFileChange(docType, file);
    setIsCameraOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isCameraOpen && (
          <CameraCapture
            onCapture={handleCapture}
            onCancel={() => setIsCameraOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium leading-none">Anexar Documento</label>
          <Badge variant={isCompleted ? "default" : "secondary"} className={isCompleted ? "status-completed" : "status-pending"}>
            {isCompleted ? (
              <>
                <Check className="w-3 h-3 mr-1" />
                Concluído
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3 mr-1" />
                Pendente
              </>
            )}
          </Badge>
        </div>

        <div className="upload-zone relative">
          <input
            type="file"
            id={`file-${docType}`}
            className="hidden"
            accept="image/*,.pdf"
            onChange={(e) => onFileChange(docType, e.target.files[0])}
          />
          <label htmlFor={`file-${docType}`} className="cursor-pointer flex flex-col items-center justify-center p-6">
            <Upload className="w-8 h-8 mb-2 text-gray-400" />
            <p className="text-sm text-gray-600">
              {doc.arquivo ? doc.arquivo.name : 'Clique para enviar ou arraste o arquivo aqui'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              JPG, PNG, PDF (máx. 5MB)
            </p>
          </label>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => setIsCameraOpen(true)}
        >
          <Camera className="mr-2 h-4 w-4" />
          Tirar Foto do Documento
        </Button>

        {doc.arquivo && doc.arquivo.data && (
          <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Pré-visualização:</p>
            {doc.arquivo.type.startsWith('image/') ? (
              <img 
                src={doc.arquivo.data}
                alt={`Pré-visualização de ${doc.arquivo.name}`}
                className="rounded-md max-h-48 w-auto mx-auto"
               src="https://images.unsplash.com/photo-1456339445756-beb5120afc42" />
            ) : (
              <div className="flex items-center justify-center p-4 bg-gray-100 rounded-md">
                <FileImage className="w-8 h-8 text-gray-500 mr-3" />
                <div className="text-sm text-gray-600">
                  <p className="font-semibold">{doc.arquivo.name}</p>
                  <p>Pré-visualização não disponível para este tipo de arquivo.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default FileUpload;