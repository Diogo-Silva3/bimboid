import { useState, useEffect } from 'react';

const initialEmployeeData = {
  // Dados pessoais
  nomeCompleto: '',
  dataNascimento: '',
  nomePai: '',
  nomeMae: '',
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
  
  // Documentos
  documentos: {
    rg: {
      numero: '',
      dataEmissao: '',
      orgaoEmissor: '',
      arquivos: [], // Agora é um array
      observacoes: '',
      status: 'pendente'
    },
    cpf: {
      numero: '',
      arquivos: [], // Agora é um array
      observacoes: '',
      status: 'pendente'
    },
    cnh: {
      numero: '',
      categoria: '',
      validade: '',
      arquivos: [], // Agora é um array
      observacoes: '',
      status: 'pendente'
    },
    tituloEleitor: {
      numero: '',
      zona: '',
      secao: '',
      arquivos: [], // Agora é um array
      observacoes: '',
      status: 'pendente'
    },
    reservista: {
      arquivos: [], // Agora é um array
      observacoes: '',
      status: 'pendente'
    },
    escolaridade: {
      arquivos: [], // Agora é um array
      observacoes: '',
      status: 'pendente'
    },
    comprovanteEndereco: {
      arquivos: [], // Agora é um array
      observacoes: '',
      status: 'pendente'
    },
    certidaoNascimento: {
      arquivos: [], // Agora é um array
      observacoes: '',
      status: 'pendente'
    },
    certidaoCasamento: {
      arquivos: [], // Agora é um array
      observacoes: '',
      status: 'pendente'
    },
    carteiraTrabalhoDigital: { // Campo para Carteira de Trabalho Digital
      numero: '',
      arquivos: [], // Inicializado como um array vazio
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