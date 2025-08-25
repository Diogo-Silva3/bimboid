import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, Edit, Trash2, FileCheck, FileX, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEmployeeData } from '@/hooks/useEmployeeData';
import { useToast } from '@/components/ui/use-toast';

export function EmployeeList() {
  const { employees, deleteEmployee } = useEmployeeData();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.nomeCompleto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.cargo?.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'all') return true;

    const pendingDocs = Object.values(employee.documentos || {})
      .filter(doc => doc.status === 'pendente').length;

    if (statusFilter === 'complete') return pendingDocs === 0;
    if (statusFilter === 'incomplete') return pendingDocs > 0;

    return true;
  });

  const handleDelete = (id, name) => {
    if (window.confirm(`Tem certeza que deseja excluir o colaborador ${name}?`)) {
      deleteEmployee(id);
      toast({
        title: "Colaborador excluído",
        description: `${name} foi removido do sistema.`,
      });
    }
  };

  const getEmployeeStatus = (employee) => {
    const docs = employee.documentos || {};
    const pendingDocs = Object.values(docs).filter(doc => doc.status === 'pendente').length;
    const totalDocs = Object.keys(docs).length;
    const completedDocs = totalDocs - pendingDocs;

    return {
      completed: completedDocs,
      total: totalDocs,
      pending: pendingDocs,
      isComplete: pendingDocs === 0
    };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Lista de Colaboradores
        </h1>
        <p className="text-gray-600 mt-2">
          Gerencie todos os colaboradores cadastrados no sistema
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants}>
        <Card className="document-card">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nome, email ou cargo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="complete">Completos</SelectItem>
                    <SelectItem value="incomplete">Incompletos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Employee List */}
      <motion.div variants={itemVariants}>
        {filteredEmployees.length === 0 ? (
          <Card className="document-card">
            <CardContent className="text-center py-12">
              <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {employees.length === 0 ? 'Nenhum colaborador cadastrado' : 'Nenhum resultado encontrado'}
              </h3>
              <p className="text-gray-500">
                {employees.length === 0 
                  ? 'Comece adicionando seu primeiro colaborador ao sistema.'
                  : 'Tente ajustar os filtros de busca para encontrar o que procura.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredEmployees.map((employee, index) => {
              const status = getEmployeeStatus(employee);
              
              return (
                <motion.div
                  key={employee.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="document-card hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {employee.nomeCompleto?.charAt(0) || 'N'}
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {employee.nomeCompleto || 'Nome não informado'}
                            </h3>
                            <p className="text-gray-600">
                              {employee.cargo || 'Cargo não informado'} • {employee.setor || 'Setor não informado'}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {employee.email || 'Email não informado'}
                            </p>
                            
                            <div className="flex items-center space-x-4 mt-3">
                              <div className="flex items-center space-x-2">
                                <Badge variant={status.isComplete ? "default" : "secondary"}>
                                  {status.completed}/{status.total} documentos
                                </Badge>
                                <Badge 
                                  variant={status.isComplete ? "default" : "outline"}
                                  className={status.isComplete ? "status-completed" : "status-pending"}
                                >
                                  {status.isComplete ? (
                                    <>
                                      <FileCheck className="w-3 h-3 mr-1" />
                                      Completo
                                    </>
                                  ) : (
                                    <>
                                      <FileX className="w-3 h-3 mr-1" />
                                      {status.pending} pendente{status.pending !== 1 ? 's' : ''}
                                    </>
                                  )}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast({
                              title: "🚧 Funcionalidade em desenvolvimento",
                              description: "A visualização detalhada será implementada em breve! 🚀"
                            })}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast({
                              title: "🚧 Funcionalidade em desenvolvimento",
                              description: "A edição de colaboradores será implementada em breve! 🚀"
                            })}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(employee.id, employee.nomeCompleto)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progresso da documentação</span>
                          <span>{Math.round((status.completed / status.total) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(status.completed / status.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Unidade:</span>
                            <p>{employee.unidade || 'Não informado'}</p>
                          </div>
                          <div>
                            <span className="font-medium">Contrato:</span>
                            <p>{employee.tipoContrato || 'Não informado'}</p>
                          </div>
                          <div>
                            <span className="font-medium">Admissão:</span>
                            <p>{employee.dataAdmissao ? new Date(employee.dataAdmissao).toLocaleDateString('pt-BR') : 'Não informado'}</p>
                          </div>
                          <div>
                            <span className="font-medium">Cadastrado em:</span>
                            <p>{new Date(employee.createdAt).toLocaleDateString('pt-BR')}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}