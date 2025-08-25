import React from 'react';
import { Upload, Check, AlertCircle, FileImage } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label'; // Importação adicionada
import { Textarea } from '@/components/ui/textarea'; // Importação adicionada

const FileUpload = ({ docType, doc, onFileChange, onDocumentChange, isCompleted }) => {
  
  const handleFileSelect = (e) => {
    // Obtém os arquivos selecionados
    const selectedFiles = Array.from(e.target.files);
    // Chama a função onFileChange passando o array de arquivos
    onFileChange(docType, selectedFiles);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium leading-none">Anexar Documento(s)</label>
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
          multiple // Permite múltiplos arquivos
          onChange={handleFileSelect}
        />
        <label htmlFor={`file-${docType}`} className="cursor-pointer flex flex-col items-center justify-center p-6">
          <Upload className="w-8 h-8 mb-2 text-gray-400" />
          <p className="text-sm text-gray-600">
            {doc.arquivos && doc.arquivos.length > 0 
              ? `${doc.arquivos.length} arquivo(s) selecionado(s)` 
              : 'Clique para enviar ou arraste o(s) arquivo(s) aqui'
            }
          </p>
          <p className="text-xs text-gray-500 mt-1">
            JPG, PNG (máx. 5MB por arquivo)
          </p>
        </label>
      </div>

      {/* Pré-visualização de múltiplos arquivos */}
      {doc.arquivos && doc.arquivos.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">Pré-visualização:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {doc.arquivos.map((arquivo, index) => (
              <div key={index} className="relative border border-gray-300 rounded-md overflow-hidden aspect-w-1 aspect-h-1 flex items-center justify-center">
                {arquivo.type && arquivo.type.startsWith('image/') && arquivo.data ? (
                  <img 
                    src={arquivo.data}
                    alt={`Pré-visualização ${index + 1}`}
                    className="block w-full h-full object-cover"
                  />
                ) : (arquivo.name ? (
                  <div className="flex flex-col items-center justify-center p-2 text-center">
                    <FileImage className="w-6 h-6 text-gray-500 mb-1" />
                    <p className="text-xs text-gray-600 truncate w-full">{arquivo.name}</p>
                    {/* Você pode adicionar um indicador para PDF aqui se quiser */}
                  </div>
                ) : null )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Observations */}
      <div className="space-y-2">
        <Label>Observações</Label>
        <Textarea
          value={doc.observacoes}
          onChange={(e) => onDocumentChange(docType, 'observacoes', e.target.value)}
          placeholder="Adicione observações ou comentários sobre este documento..."
          rows={3}
        />
      </div>
    </div>
  );
};

export default FileUpload;