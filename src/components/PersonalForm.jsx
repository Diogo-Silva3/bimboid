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