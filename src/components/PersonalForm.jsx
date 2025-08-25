import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PersonalForm = ({ employeeData, onInputChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="nomeCompleto">Nome Completo *</Label>
        <Input
          id="nomeCompleto"
          value={employeeData.nomeCompleto}
          onChange={(e) => onInputChange('nomeCompleto', e.target.value)}
          placeholder="Digite o nome completo"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dataNascimento">Data de Nascimento</Label>
        <Input
          id="dataNascimento"
          type="date"
          value={employeeData.dataNascimento}
          onChange={(e) => onInputChange('dataNascimento', e.target.value)}
        />
      </div>

      {/* Novos campos adicionados */}
      <div className="space-y-2">
        <Label htmlFor="nomePai">Nome do Pai</Label>
        <Input
          id="nomePai"
          value={employeeData.nomePai}
          onChange={(e) => onInputChange('nomePai', e.target.value)}
          placeholder="Digite o nome do pai"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nomeMae">Nome da Mãe</Label>
        <Input
          id="nomeMae"
          value={employeeData.nomeMae}
          onChange={(e) => onInputChange('nomeMae', e.target.value)}
          placeholder="Digite o nome da mãe"
        />
      </div>

       {/* Adicionar os campos de RG aqui */}
      <div className="md:col-span-2 space-y-2"> {/* Ocupa duas colunas para o título e campos */}
        <Label>RG:</Label> {/* Rótulo principal "RG:" */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* Grid para os campos do RG */}
          <div className="space-y-2">
            <Label htmlFor="rgNumero">Número</Label>
            <Input
              id="rgNumero"
              value={employeeData.documentos.rg.numero}
              onChange={(e) => onInputChange('documentos', { ...employeeData.documentos, rg: { ...employeeData.documentos.rg, numero: e.target.value }})}
              placeholder="00.000.000-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rgDataEmissao">Data de Emissão</Label>
            <Input
              id="rgDataEmissao"
              type="date"
              value={employeeData.documentos.rg.dataEmissao}
              onChange={(e) => onInputChange('documentos', { ...employeeData.documentos, rg: { ...employeeData.documentos.rg, dataEmissao: e.target.value }})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rgOrgaoEmissor">Órgão Emissor</Label>
            <Input
              id="rgOrgaoEmissor"
              value={employeeData.documentos.rg.orgaoEmissor}
              onChange={(e) => onInputChange('documentos', { ...employeeData.documentos, rg: { ...employeeData.documentos.rg, orgaoEmissor: e.target.value }})}
              placeholder="SSP/SP"
            />
          </div>
        </div>
      </div> {/* <--- DIV QUE FALTAVA */}

      {/* Adicionar o campo de CPF de volta aqui, se necessário, ajustando o layout */}
       <div className="space-y-2">
        <Label htmlFor="cpf">CPF</Label>
        <Input
          id="cpf"
          value={employeeData.documentos.cpf.numero}
          onChange={(e) => onInputChange('documentos', { ...employeeData.documentos, cpf: { ...employeeData.documentos.cpf, numero: e.target.value }})}
          placeholder="Digite o número do CPF"
        />
      </div>


      {/* Fim dos novos campos */}

      <div className="space-y-2">
        <Label htmlFor="sexo">Sexo</Label>
        <Select value={employeeData.sexo} onValueChange={(value) => onInputChange('sexo', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o sexo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="masculino">Masculino</SelectItem>
            <SelectItem value="feminino">Feminino</SelectItem>
            <SelectItem value="outro">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="estadoCivil">Estado Civil</Label>
        <Select value={employeeData.estadoCivil} onValueChange={(value) => onInputChange('estadoCivil', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o estado civil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="solteiro">Solteiro(a)</SelectItem>
            <SelectItem value="casado">Casado(a)</SelectItem>
            <SelectItem value="divorciado">Divorciado(a)</SelectItem>
            <SelectItem value="viuvo">Viúvo(a)</SelectItem>
            <SelectItem value="uniao-estavel">União Estável</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nacionalidade">Nacionalidade</Label>
        <Input
          id="nacionalidade"
          value={employeeData.nacionalidade}
          onChange={(e) => onInputChange('nacionalidade', e.target.value)}
          placeholder="Ex: Brasileira"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="naturalidade">Naturalidade</Label>
        <Input
          id="naturalidade"
          value={employeeData.naturalidade}
          onChange={(e) => onInputChange('naturalidade', e.target.value)}
          placeholder="Ex: São Paulo, SP"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefone">Telefone</Label>
        <Input
          id="telefone"
          value={employeeData.telefone}
          onChange={(e) => onInputChange('telefone', e.target.value)}
          placeholder="(11) 99999-9999"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail *</Label>
        <Input
          id="email"
          type="email"
          value={employeeData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          placeholder="email@exemplo.com"
        />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="endereco">Endereço Completo</Label>
        <Input
          id="endereco"
          value={employeeData.endereco}
          onChange={(e) => onInputChange('endereco', e.target.value)}
          placeholder="Rua, número, bairro"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cidade">Cidade</Label>
        <Input
          id="cidade"
          value={employeeData.cidade}
          onChange={(e) => onInputChange('cidade', e.target.value)}
          placeholder="Nome da cidade"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="estado">Estado</Label>
        <Input
          id="estado"
          value={employeeData.estado}
          onChange={(e) => onInputChange('estado', e.target.value)}
          placeholder="Ex: SP"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cep">CEP</Label>
        <Input
          id="cep"
          value={employeeData.cep}
          onChange={(e) => onInputChange('cep', e.target.value)}
          placeholder="00000-000"
        />
      </div>
    </div>
  );
};

export default PersonalForm;