import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FileUpload from '@/components/FileUpload';

const DocumentTabContent = ({ docType, employeeData, onDocumentChange, onFileChange }) => {
  const doc = employeeData.documentos[docType];
  
  // Verifica se há arquivos para considerar o documento como concluído
  const isCompleted = doc.arquivos && doc.arquivos.length > 0;

  return (
    <div className="space-y-6">
      {/* Document specific fields */}
      

      

      {docType === 'cnh' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Número da CNH</Label>
            <Input
              value={doc.numero}
              onChange={(e) => onDocumentChange(docType, 'numero', e.target.value)}
              placeholder="00000000000"
            />
          </div>
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select value={doc.categoria} onValueChange={(value) => onDocumentChange(docType, 'categoria', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="C">C</SelectItem>
                <SelectItem value="D">D</SelectItem>
                <SelectItem value="E">E</SelectItem>
                <SelectItem value="AB">AB</SelectItem>
                <SelectItem value="AC">AC</SelectItem>
                <SelectItem value="AD">AD</SelectItem>
                <SelectItem value="AE">AE</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Validade</Label>
            <Input
              type="date"
              value={doc.validade}
              onChange={(e) => onDocumentChange(docType, 'validade', e.target.value)}
            />
          </div>
        </div>
      )}

      {docType === 'tituloEleitor' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Número do Título</Label>
            <Input
              value={doc.numero}
              onChange={(e) => onDocumentChange(docType, 'numero', e.target.value)}
              placeholder="0000 0000 0000"
            />
          </div>
          <div className="space-y-2">
            <Label>Zona</Label>
            <Input
              value={doc.zona}
              onChange={(e) => onDocumentChange(docType, 'zona', e.target.value)}
              placeholder="000"
            />
          </div>
          <div className="space-y-2">
            <Label>Seção</Label>
            <Input
              value={doc.secao}
              onChange={(e) => onDocumentChange(docType, 'secao', e.target.value)}
              placeholder="0000"
            />
          </div>
        </div>
      )}

      {/* File upload section */}
      <FileUpload
        docType={docType}
        // Passando o array de arquivos e as observações para o FileUpload
        doc={{ arquivos: doc.arquivos, observacoes: doc.observacoes }}
        onFileChange={onFileChange}
        isCompleted={isCompleted}
        // Passando onDocumentChange para que FileUpload possa atualizar observações se necessário
        onDocumentChange={onDocumentChange}
      />

      {/* As observações foram movidas para dentro do FileUpload para estarem próximas ao upload */}

    </div>
  );
};

export default DocumentTabContent;