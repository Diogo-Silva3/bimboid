import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, FileText, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useEmployeeData } from '@/hooks/useEmployeeData';
import PersonalForm from '@/components/PersonalForm';
import ProfessionalForm from '@/components/ProfessionalForm';
import DocumentsTabs from '@/components/DocumentsTabs';

export function EmployeeForm() {
  const { currentEmployee, setCurrentEmployee, saveEmployee } = useEmployeeData();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('personal');

  const handleInputChange = (field, value) => {
    setCurrentEmployee(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDocumentChange = (docType, field, value) => {
    setCurrentEmployee(prev => ({
      ...prev,
      documentos: {
        ...prev.documentos,
        [docType]: {
          ...prev.documentos[docType],
          [field]: value
        }
      }
    }));
  };

  const handleFileChange = (docType, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleDocumentChange(docType, 'arquivo', {
          name: file.name,
          size: file.size,
          type: file.type,
          data: e.target.result
        });
        handleDocumentChange(docType, 'status', 'concluido');
        toast({
          title: "Arquivo processado!",
          description: `${file.name} foi anexado com sucesso.`,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentEmployee.nomeCompleto || !currentEmployee.email) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha pelo menos o nome completo e email.",
        variant: "destructive"
      });
      return;
    }

    try {
      saveEmployee(currentEmployee);
      toast({
        title: "Colaborador cadastrado!",
        description: "Os dados foram salvos com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar os dados. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Cadastro de Colaborador
        </h1>
        <p className="text-gray-600 mt-2">
          Preencha os dados pessoais, profissionais e documentação
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Dados Pessoais
            </TabsTrigger>
            <TabsTrigger value="professional" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Dados Profissionais
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Documentos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card className="document-card">
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                  Dados básicos do colaborador
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PersonalForm
                  employeeData={currentEmployee}
                  onInputChange={handleInputChange}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professional">
            <Card className="document-card">
              <CardHeader>
                <CardTitle>Informações Profissionais</CardTitle>
                <CardDescription>
                  Dados relacionados ao trabalho na empresa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProfessionalForm
                  employeeData={currentEmployee}
                  onInputChange={handleInputChange}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <DocumentsTabs
              employeeData={currentEmployee}
              onDocumentChange={handleDocumentChange}
              onFileChange={handleFileChange}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-center pt-6">
          <Button type="submit" size="lg" className="px-8">
            <Save className="w-4 h-4 mr-2" />
            Salvar Colaborador
          </Button>
        </div>
      </form>
    </motion.div>
  );
}