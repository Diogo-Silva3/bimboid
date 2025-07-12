import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FileUpload from '@/components/FileUpload';

const DocumentTabContent = ({ docType, employeeData, onDocumentChange, onFileChange }) => {
  const doc = employeeData.documentos[docType];
  const isCompleted = doc.status === 'concluido';

  return (
    <div className="space-y-6">
      {/* Document specific fields */}
      {docType === 'rg' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Número do RG</Label>
            <Input
              value={doc.numero}
              onChange={(e) => onDocumentChange(docType, 'numero', e.target.value)}
              placeholder="00.000.000-0"
            />
          </div>
          <div className="space-y-2">
            <Label>Data de Emissão</Label>
            <Input
              type="date"
              value={doc.dataEmissao}
              onChange={(e) => onDocumentChange(docType, 'dataEmissao', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Órgão Emissor</Label>
            <Input
              value={doc.orgaoEmissor}
              onChange={(e) => onDocumentChange(docType, 'orgaoEmissor', e.target.value)}
              placeholder="SSP/SP"
            />
          </div>
        </div>
      )}

      {docType === 'cpf' && (
        <div className="space-y-2">
          <Label>Número do CPF</Label>
          <Input
            value={doc.numero}
            onChange={(e) => onDocumentChange(docType, 'numero', e.target.value)}
            placeholder="000.000.000-00"
          />
        </div>
      )}

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
        doc={doc}
        onFileChange={onFileChange}
        isCompleted={isCompleted}
      />

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

export default DocumentTabContent;