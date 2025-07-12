
import { useState, useEffect } from 'react';

const initialEmployeeData = {
  // Dados pessoais
  nomeCompleto: '',
  dataNascimento: '',
  sexo: '',
  estadoCivil: '',
  nacionalidade: '',
  naturalidade: '',
  telefone: '',
  email: '',
  endereco: '',
  cidade: '',
  estado: '',
  cep: '',
  
  // Dados profissionais
  unidade: '',
  setor: '',
  cargo: '',
  tipoContrato: '',
  dataAdmissao: '',
  
  // Documentos
  documentos: {
    rg: {
      numero: '',
      dataEmissao: '',
      orgaoEmissor: '',
      arquivo: null,
      observacoes: '',
      status: 'pendente'
    },
    cpf: {
      numero: '',
      arquivo: null,
      observacoes: '',
      status: 'pendente'
    },
    cnh: {
      numero: '',
      categoria: '',
      validade: '',
      arquivo: null,
      observacoes: '',
      status: 'pendente'
    },
    tituloEleitor: {
      numero: '',
      zona: '',
      secao: '',
      arquivo: null,
      observacoes: '',
      status: 'pendente'
    },
    reservista: {
      arquivo: null,
      observacoes: '',
      status: 'pendente'
    },
    escolaridade: {
      arquivo: null,
      observacoes: '',
      status: 'pendente'
    },
    comprovanteEndereco: {
      arquivo: null,
      observacoes: '',
      status: 'pendente'
    },
    certidaoNascimento: {
      arquivo: null,
      observacoes: '',
      status: 'pendente'
    },
    certidaoCasamento: {
      arquivo: null,
      observacoes: '',
      status: 'pendente'
    }
  }
};

export function useEmployeeData() {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(initialEmployeeData);

  useEffect(() => {
    const savedEmployees = localStorage.getItem('bimbo-employees');
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
  }, []);

  const saveEmployee = (employeeData) => {
    const newEmployee = {
      ...employeeData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    localStorage.setItem('bimbo-employees', JSON.stringify(updatedEmployees));
    setCurrentEmployee(initialEmployeeData);
    return newEmployee;
  };

  const updateEmployee = (id, employeeData) => {
    const updatedEmployees = employees.map(emp => 
      emp.id === id 
        ? { ...employeeData, id, updatedAt: new Date().toISOString() }
        : emp
    );
    setEmployees(updatedEmployees);
    localStorage.setItem('bimbo-employees', JSON.stringify(updatedEmployees));
  };

  const deleteEmployee = (id) => {
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem('bimbo-employees', JSON.stringify(updatedEmployees));
  };

  const getEmployeeStats = () => {
    const total = employees.length;
    const incomplete = employees.filter(emp => {
      const docs = emp.documentos || {};
      return Object.values(docs).some(doc => doc.status === 'pendente');
    }).length;
    
    const complete = total - incomplete;
    
    return { total, complete, incomplete };
  };

  return {
    employees,
    currentEmployee,
    setCurrentEmployee,
    saveEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeStats,
    initialEmployeeData
  };
}
