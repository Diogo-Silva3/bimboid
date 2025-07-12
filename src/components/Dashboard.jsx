
import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileCheck, FileX, Building2, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEmployeeData } from '@/hooks/useEmployeeData';

export function Dashboard() {
  const { employees, getEmployeeStats } = useEmployeeData();
  const stats = getEmployeeStats();

  const recentEmployees = employees
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

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
          Dashboard BIMBO ID+
        </h1>
        <p className="text-gray-600 mt-2">
          Visão geral do sistema de gerenciamento de colaboradores
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="document-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Colaboradores</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Cadastros no sistema
            </p>
          </CardContent>
        </Card>

        <Card className="document-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cadastros Completos</CardTitle>
            <FileCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.complete}</div>
            <p className="text-xs text-muted-foreground">
              Documentação finalizada
            </p>
          </CardContent>
        </Card>

        <Card className="document-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cadastros Pendentes</CardTitle>
            <FileX className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stats.incomplete}</div>
            <p className="text-xs text-muted-foreground">
              Documentação incompleta
            </p>
          </CardContent>
        </Card>

        <Card className="document-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {stats.total > 0 ? Math.round((stats.complete / stats.total) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Eficiência do processo
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Employees */}
      <motion.div variants={itemVariants}>
        <Card className="document-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Colaboradores Recentes
            </CardTitle>
            <CardDescription>
              Últimos cadastros realizados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentEmployees.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum colaborador cadastrado ainda</p>
                <p className="text-sm">Comece criando seu primeiro cadastro!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentEmployees.map((employee, index) => {
                  const pendingDocs = Object.values(employee.documentos || {})
                    .filter(doc => doc.status === 'pendente').length;
                  const totalDocs = Object.keys(employee.documentos || {}).length;
                  const completedDocs = totalDocs - pendingDocs;
                  
                  return (
                    <motion.div
                      key={employee.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {employee.nomeCompleto?.charAt(0) || 'N'}
                        </div>
                        <div>
                          <p className="font-medium">{employee.nomeCompleto || 'Nome não informado'}</p>
                          <p className="text-sm text-gray-500">
                            {employee.cargo || 'Cargo não informado'} • {employee.setor || 'Setor não informado'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={pendingDocs === 0 ? "default" : "secondary"}>
                          {completedDocs}/{totalDocs} docs
                        </Badge>
                        <Badge 
                          variant={pendingDocs === 0 ? "default" : "outline"}
                          className={pendingDocs === 0 ? "status-completed" : "status-pending"}
                        >
                          {pendingDocs === 0 ? 'Completo' : 'Pendente'}
                        </Badge>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card className="document-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Ações Rápidas
            </CardTitle>
            <CardDescription>
              Funcionalidades principais do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg cursor-pointer hover:shadow-md transition-all"
              >
                <Users className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-semibold text-blue-900">Novo Cadastro</h3>
                <p className="text-sm text-blue-700">Adicionar novo colaborador</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg cursor-pointer hover:shadow-md transition-all"
              >
                <FileCheck className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-semibold text-green-900">Gerenciar Docs</h3>
                <p className="text-sm text-green-700">Visualizar documentação</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg cursor-pointer hover:shadow-md transition-all"
              >
                <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
                <h3 className="font-semibold text-purple-900">Relatórios</h3>
                <p className="text-sm text-purple-700">Análises e estatísticas</p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
