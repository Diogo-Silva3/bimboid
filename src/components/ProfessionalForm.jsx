import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ProfessionalForm = ({ employeeData, onInputChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="unidade">Unidade da Empresa</Label>
        <Input
          id="unidade"
          value={employeeData.unidade}
          onChange={(e) => onInputChange('unidade', e.target.value)}
          placeholder="Nome da unidade"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="setor">Setor</Label>
        <Input
          id="setor"
          value={employeeData.setor}
          onChange={(e) => onInputChange('setor', e.target.value)}
          placeholder="Setor de trabalho"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cargo">Cargo</Label>
        <Input
          id="cargo"
          value={employeeData.cargo}
          onChange={(e) => onInputChange('cargo', e.target.value)}
          placeholder="Cargo ocupado"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipoContrato">Tipo de Contrato</Label>
        <Select value={employeeData.tipoContrato} onValueChange={(value) => onInputChange('tipoContrato', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="clt">CLT</SelectItem>
            <SelectItem value="pj">Pessoa Jurídica</SelectItem>
            <SelectItem value="estagio">Estágio</SelectItem>
            <SelectItem value="terceirizado">Terceirizado</SelectItem>
            <SelectItem value="temporario">Temporário</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dataAdmissao">Data de Admissão</Label>
        <Input
          id="dataAdmissao"
          type="date"
          value={employeeData.dataAdmissao}
          onChange={(e) => onInputChange('dataAdmissao', e.target.value)}
        />
      </div>
    </div>
  );
};

export default ProfessionalForm;