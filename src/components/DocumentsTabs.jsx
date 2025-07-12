import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DocumentTabContent from '@/components/DocumentTabContent';

const documentTabsConfig = [
  { id: 'rg', label: 'RG', icon: FileText },
  { id: 'cpf', label: 'CPF', icon: FileText },
  { id: 'cnh', label: 'CNH', icon: FileText },
  { id: 'tituloEleitor', label: 'Título Eleitor', icon: FileText },
  { id: 'reservista', label: 'Reservista', icon: FileText },
  { id: 'escolaridade', label: 'Escolaridade', icon: FileText },
  { id: 'comprovanteEndereco', label: 'Comprovante End.', icon: FileText },
  { id: 'certidaoNascimento', label: 'Cert. Nascimento', icon: FileText },
  { id: 'certidaoCasamento', label: 'Cert. Casamento', icon: FileText }
];

const DocumentsTabs = ({ employeeData, onDocumentChange, onFileChange }) => {

  const getDocumentStatus = (docType) => {
    const doc = employeeData.documentos[docType];
    return doc.status === 'concluido' ? 'completed' : 'pending';
  };

  return (
    <Card className="document-card">
      <CardHeader>
        <CardTitle>Documentação</CardTitle>
        <CardDescription>
          Gerencie todos os documentos do colaborador
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="rg" className="space-y-4">
          <TabsList className="grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-1 h-auto flex-wrap">
            {documentTabsConfig.map((tab) => {
              const status = getDocumentStatus(tab.id);
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-1 text-xs relative flex-wrap h-auto py-2"
                >
                  <tab.icon className="w-3 h-3" />
                  {tab.label}
                  {status === 'completed' && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {documentTabsConfig.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DocumentTabContent
                    docType={tab.id}
                    employeeData={employeeData}
                    onDocumentChange={onDocumentChange}
                    onFileChange={onFileChange}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DocumentsTabs;