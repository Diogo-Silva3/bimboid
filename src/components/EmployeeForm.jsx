import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { useToast } from '@/components/ui/use-toast';
import { useEmployeeData } from '@/hooks/useEmployeeData';
import PersonalForm from '@/components/PersonalForm';
import DocumentsTabs from '@/components/DocumentsTabs';
import { jsPDF } from "jspdf";

// Importar funcionalidades do pdfjs-dist de forma compatível com build
import * as pdfjsLib from 'pdfjs-dist';

// Defina o workerSrc para pdf.js
// Certifique-se de que este caminho está correto para o seu ambiente (CDN ou local)
// A URL abaixo aponta para o CDN do cdnjs usando a versão da biblioteca instalada
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;


export function EmployeeForm() {
  const { currentEmployee, setCurrentEmployee, saveEmployee } = useEmployeeData();
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const { toast } = useToast();

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

  const handleFileChange = async (docType, files) => {
    if (files && files.length > 0) {
      const filesData = [];

      const readFile = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({
              name: file.name,
              size: file.size,
              type: file.type,
              data: e.target.result // Data URL (base64)
            });
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(file);
        });
      };

      try {
        const processedFiles = await Promise.all(files.map(async (file) => {
          if (file.type === 'application/pdf') {
            // Processar PDF: converter cada página em imagem
            const pdfImages = [];
            try {
              // Decodificar base64 e carregar o documento PDF
              const pdf = await pdfjsLib.getDocument({ data: atob(file.data.split(',')[1]) }).promise;
              for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                // Ajuste a escala conforme necessário para qualidade vs. tamanho do arquivo
                const viewport = page.getViewport({ scale: 2 });
                const canvas = document.createElement('canvas');
                const canvasContext = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                await page.render({ canvasContext, viewport }).promise;
                const imgData = canvas.toDataURL('image/png'); // Converter página para PNG Data URL
                pdfImages.push({
                  name: `${file.name}_page_${pageNum}.png`, // Nome da imagem gerada
                  originalName: file.name, // Nome do arquivo PDF original
                  type: 'image/png',
                  data: imgData,
                  page: pageNum // Número da página
                });
                canvas.remove(); // Limpar o canvas
              }
            } catch (pdfError) {
              console.error("Erro ao processar PDF:", pdfError);
              // Adicionar um placeholder ou indicador de erro para o PDF original
               pdfImages.push({
                 name: file.name,
                 originalName: file.name,
                 type: 'application/pdf', // Manter o tipo original para indicar erro
                 data: null, // Sem data URL válida
                 error: "Erro ao processar PDF"
               });
            }
            return pdfImages; // Retorna array de imagens para este PDF
          } else if (file.type.startsWith('image/')) {
            // Processar imagens (JPG, PNG, etc.): ler como Data URL
            const fileData = await readFile(file);
            return [fileData]; // Retorna um array contendo o objeto de imagem
          } else {
            // Formato não suportado (nem imagem, nem PDF)
             return [{
                name: file.name,
                originalName: file.name,
                type: file.type,
                data: null,
                error: "Formato de arquivo não suportado"
             }];
          }
        }));

        // Aplanar o array de arrays (se houver PDFs com múltiplas páginas) e filtrar arquivos com erro grave
        const validFilesData = processedFiles.flat().filter(file => file.data !== null || file.error);


        setCurrentEmployee(prev => ({
          ...prev,
          documentos: {
            ...prev.documentos,
            [docType]: {
              ...prev.documentos[docType],
              arquivos: [...(prev.documentos[docType].arquivos || []), ...validFilesData],
              status: validFilesData.length > 0 ? 'concluido' : 'pendente' // Atualizar status baseado se há arquivos válidos
            }
          }
        }));

        if (validFilesData.length > 0) {
             toast({
               title: "Arquivos processados!",
               description: `${validFilesData.length} item(ns) anexado(s) com sucesso.`
             });
        } else {
             toast({
               title: "Nenhum arquivo válido para processar.",
               description: "Certifique-se de anexar imagens (JPG, PNG) ou PDFs.",
               variant: "destructive"
             });
        }


      } catch (error) {
        console.error("Erro geral ao processar arquivos:", error);
        toast({
          title: "Erro ao processar arquivos",
          description: "Ocorreu um erro ao processar um ou mais arquivos.",
          variant: "destructive"
        });
      }
    }
  };


  const handleGeneratePDF = async () => {
    console.log("handleGeneratePDF called");
    const doc = new jsPDF();

    let yPos = 15; // Initial Y position with more padding
    const margin = 15; // Page margin
    const lineHeight = 8; // Vertical space between lines
    const imageSpacing = 10; // Vertical space after adding an image
    const imageMaxHeight = 100; // Increased max height for images
    const imageMaxWidth = doc.internal.pageSize.getWidth() - margin * 2 - 20; // Maximum width for images

    // Function to add text with line breaks
    const addText = (text, x, y, options = {}) => {
      const splitText = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - x - margin);
      doc.text(splitText, x, y, options);
      return y + splitText.length * lineHeight;
    };

    console.log("currentEmployee:", currentEmployee);

    // Define PDF title including candidate name
    const pdfTitle = `Cadastro do Candidato - ${currentEmployee.nomeCompleto || 'Sem Nome'}`;

    // Add Title
    doc.setFontSize(18);
    doc.text(pdfTitle, margin, yPos);
    yPos += lineHeight * 2; // Increase Y position

    // Add Personal Data Section Title
    doc.setFontSize(16); // Slightly larger font for section title
    doc.text("Informações Pessoais:", margin, yPos + lineHeight * 0.5); // Add some space before section title
    yPos += lineHeight * 1.5; // Increase Y position

    const personalDataLabels = {
      nomeCompleto: "Nome Completo",
      dataNascimento: "Data de Nascimento",
      nomePai: "Nome do Pai",
      nomeMae: "Nome da Mãe",
      sexo: "Sexo",
      estadoCivil: "Estado Civil",
      nacionalidade: "Nacionalidade",
      naturalidade: "Naturalidade",
      telefone: "Telefone",
      email: "E-mail",
      endereco: "Endereço Completo",
      cidade: "Cidade",
      estado: "Estado",
      cep: "CEP",
    };

    doc.setFontSize(12); // Font size for personal data fields

    for (const key in currentEmployee) {
      if (currentEmployee.hasOwnProperty(key) && key !== 'documentos') {
        const label = personalDataLabels[key] || key; // Use label if available, otherwise use key
        const value = currentEmployee[key];

        // Add label in bold
        doc.setFont(undefined, 'bold');
        doc.text(`${label}:`, margin, yPos);

        // Add value with increased spacing and potential alignment
        doc.setFont(undefined, 'normal');
        const labelWidth = doc.getTextWidth(`${label}: `);
        yPos = addText(`${value}`, margin + labelWidth + 5, yPos); // Add 5 units of extra space

        yPos += lineHeight * 0.8; // Add a little extra space between fields
      }
    }

    // Add new page before Documents section
    doc.addPage();
    yPos = margin; // Reset yPos for the new page

    // Add Documents Data Section Title
    doc.setFontSize(16); // Slightly larger font for section title
    doc.text("Documentos:", margin, yPos);
    yPos += lineHeight * 1.5; // Increase Y position

    const documentDataLabels = {
      numero: "Número",
      dataEmissao: "Data de Emissão",
      orgaoEmissor: "Órgão Emissor",
      categoria: "Categoria",
      validade: "Validade",
      zona: "Zona",
      secao: "Seção",
      observacoes: "Observações",
      status: "Status",
    };

    doc.setFontSize(12); // Font size for document data fields

    for (const docType in currentEmployee.documentos) {
      const document = currentEmployee.documentos[docType];

      // Check if document has data or files before adding to PDF
      const hasData = Object.values(document).some(value =>
        (typeof value === 'string' && value.trim() !== '') ||
        (Array.isArray(value) && value.length > 0)
      );

      if (hasData) {
        // Add a new page before each document type, except the very first one in the section
        if (docType !== Object.keys(currentEmployee.documentos)[0]) {
             doc.addPage();
             yPos = margin; // Reset yPos for the new page
        }

        doc.setFontSize(14); // Slightly larger font for document type
        doc.text(`${docType.toUpperCase()}:`, margin, yPos + lineHeight * 0.5); // Add space before document type
        yPos += lineHeight * 1.5; // Increased space after document type title

        // Add document text fields (filter out 'arquivos')
        doc.setFontSize(12); // Font size for document fields
        for (const field in document) {
          if (document.hasOwnProperty(field) && field !== 'arquivos') {
            const label = documentDataLabels[field] || field; // Use label if available, otherwise use field
            const value = document[field];

            // Add label in bold
            doc.setFont(undefined, 'bold');
            doc.text(`${label}:`, margin + 5, yPos); // Add 5 units of recuo

            // Add value with increased spacing
            doc.setFont(undefined, 'normal');
            const labelWidth = doc.getTextWidth(`${label}: `);
            yPos = addText(`${value}`, margin + 5 + labelWidth + 5, yPos); // Add 5 units of recuo and 5 units of extra space
            yPos += lineHeight * 0.5; // Add a little space between document fields
          }
        }

        // After adding text fields, add space before potentially adding images
        if (document.arquivos && document.arquivos.length > 0) {
             yPos += lineHeight; // Add some space between text fields and image section title

            // Add "Arquivos:" label before the images
           doc.setFontSize(12);
           yPos = addText("Arquivos:", margin + 5, yPos);
           yPos += lineHeight; // Add space after files label

          for (const file of document.arquivos) {
            if (file.data) { // Only add if data URL is available
              try {
                const img = new Image();
                img.src = file.data;

                const aspectRatio = img.width / img.height;
                let imageHeight = imageMaxHeight;
                let imageWidth = imageHeight * aspectRatio;

                // Adjust width if it exceeds imageMaxWidth
                if (imageWidth > imageMaxWidth) {
                    imageWidth = imageMaxWidth;
                    imageHeight = imageWidth / aspectRatio;
                 }

                 // Check if adding the image would exceed the page height. If so, add a new page.
                 // This check is now inside the file loop to ensure each image starts on a new page if it overflows
                 if (yPos + imageHeight > doc.internal.pageSize.getHeight() - margin) {
                     doc.addPage();
                     yPos = margin; // Reset yPos for the new page
                     // Optionally re-add document type title on the new page if it splits
                     doc.setFontSize(14);
                     doc.text(`${docType.toUpperCase()} (continuação):`, margin, yPos + lineHeight * 0.5);
                     yPos += lineHeight * 1.5;
                     doc.setFontSize(12);
                     yPos = addText("Arquivos (continuação):", margin + 5, yPos);
                     yPos += lineHeight;
                 }


                 // Determine image format for jsPDF (assuming PNG since PDF pages are converted to PNG)
                const imgFormat = file.type.split('/')[1]?.toUpperCase(); // Use optional chaining to be safe
                const imgX = (doc.internal.pageSize.getWidth() - imageWidth) / 2; // Center the image horizontally

                if (imgFormat === 'PNG' || imgFormat === 'JPEG') { // Ensure only image formats are added
                    doc.addImage(file.data, imgFormat, imgX, yPos, imageWidth, imageHeight); // Use imgX for centering
                    yPos += imageHeight + imageSpacing; // Increase Y position after adding image with defined spacing
                } else {
                    // Fallback or error message if somehow a non-image type got here without error flag
                     doc.setFontSize(11);
                     yPos = addText(`Formato de arquivo inesperado para exibição: ${file.name} (${file.type})`, margin + 10, yPos);
                     yPos += lineHeight;
                }

              } catch (error) {
                console.error("Error adding file to PDF:", error);
                doc.setFontSize(11);
                yPos = addText(`Erro ao carregar ou adicionar arquivo: ${file.name}`, margin + 10, yPos);
                yPos += lineHeight; // Add space for the message

              }
            } else if (file.error) {
                 // Display error message for files that failed to process
                 doc.setFontSize(11);
                 yPos = addText(`Erro ao processar arquivo ${file.originalName || file.name}: ${file.error}`, margin + 10, yPos);
                 yPos += lineHeight; // Add space for the message
             }
          }
          // Add space after all files for this document type
          yPos += lineHeight * 1.5;
        } else {
             // If no files, add some space before the next document type section
             yPos += lineHeight * 1.5;
        }

         // Check if there is enough space for the next document, otherwise add a new page
          if (yPos + lineHeight * 5 > doc.internal.pageSize.getHeight() - margin) { // Estimate space needed for next document section
            doc.addPage();
            yPos = margin; // Reset yPos for new page
          }
      }
    }


    // Save the PDF
    const fileName = `cadastro_${currentEmployee.nomeCompleto.replace(/[^a-zA-Z0-9]/g, '_') || 'sem_nome'}.pdf`;
    doc.save(fileName);

    toast({
      title: "PDF Gerado",
      description: "O relatório do candidato foi gerado com sucesso.",
    });
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
 Cadastro de Candidato
 </h1>
 <p className="text-gray-600 mt-2">Preencha os dados pessoais e documentação</p>
 </div>

      <div>
        {/* Personal Data Section */}
        <Card className="document-card mb-6"> {/* Added margin-bottom */}
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>
              Dados básicos do Candidato
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PersonalForm
              employeeData={currentEmployee}
              onInputChange={handleInputChange}
            />
          </CardContent>
        </Card>

        {/* Documents Section */}
        <Card className="document-card">
          <CardHeader>
            <CardTitle>Documentação</CardTitle> {/* Changed title for clarity */}
            <CardDescription>
              Anexe e preencha os dados dos documentos do Candidato
            </CardDescription>
          </CardHeader>
          <CardContent>
 {/* DocumentsTabs component rendered directly */}
            <DocumentsTabs
 employeeData={currentEmployee}
 onDocumentChange={handleDocumentChange}
 onFileChange={handleFileChange}
 />
 {/* As tags TabsContent, CardContent e Card são gerenciadas internamente por DocumentsTabs */}
          </CardContent>
 </Card>

 {/* PDF Generation Button */}
 {/* Policy Agreement Checkbox */}
 <div className="mt-6 flex items-center space-x-2">
 <input
 type="checkbox"
 id="policy-agreement"
 checked={agreedToPolicy}
 onChange={(e) => setAgreedToPolicy(e.target.checked)}
 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
 />
 <label htmlFor="policy-agreement" className="text-sm text-gray-700">
 Li e concordo com a <a href="#" onClick={() => {/* TODO: Link to Privacy Policy Page */}} className="text-blue-600 hover:underline">Política de Privacidade e Compartilhamento de Dados</a>.
 </label>
 </div>

 <div className="flex justify-center pt-4">
 <Button onClick={handleGeneratePDF} size="lg" className="px-8" disabled={!agreedToPolicy}>
 <Save className="w-4 h-4 mr-2" />
 Gerar PDF
 </Button>
 </div>
 </div>
    </motion.div>
  );
}
