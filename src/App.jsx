import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, UserPlus, Users, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { Dashboard } from '@/components/Dashboard';
import { EmployeeForm } from '@/components/EmployeeForm';
import { EmployeeList } from '@/components/EmployeeList';
import PrivacyPolicy from '@/components/PrivacyPolicy';

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'new-employee', label: 'Novo Candidato', icon: UserPlus },
  { id: 'employee-list', label: 'Lista de Candidatos', icon: Users }
];

function App() {
  const [activeView, setActiveView] = useState('new-employee'); // Alterado para 'new-employee'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'new-employee':
        return <EmployeeForm />;
      case 'employee-list':
        return <EmployeeList />;
      case 'privacy-policy':
        return <PrivacyPolicy />;
      default:
        return <Dashboard />;
    }
  };

  const handleNavigation = (viewId) => {
    setActiveView(viewId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>BIMBO - Sistema de Gerenciamento de Candidato</title>
        <meta name="description" content="Sistema completo para cadastro e gerenciamento de candidato da empresa BIMBO, com controle de documentação e dados pessoais." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <img src="/Bimbo.png" alt="BIMBO Logo" className="h-10"/>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">BIMBO</h1>
                  <p className="text-xs text-gray-500">Sistema de Candidato</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "default" : "ghost"}
                      onClick={() => handleNavigation(item.id)}
                      className={`flex items-center space-x-2 ${
                        isActive 
                          ? 'bimbo-gradient text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Button>
                  );
                })}
              </nav>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white border-t border-gray-200"
              >
                <div className="px-4 py-2 space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;
                    
                    return (
                      <Button
                        key={item.id}
                        variant={isActive ? "default" : "ghost"}
                        onClick={() => handleNavigation(item.id)}
                        className={`w-full justify-start flex items-center space-x-2 ${
                          isActive 
                            ? 'bimbo-gradient text-white' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200/50 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <img src="/Bimbo.png" alt="BIMBO Logo" className="h-8"/>
              </div>
              <p className="text-gray-600 text-sm">
                Sistema de Gerenciamento de Candidato
              </p>
              <p className="text-gray-500 text-xs mt-2">
                © 2025 BIMBO. Todos os direitos reservados.
              </p>
              <button className="text-gray-500 text-xs mt-1 underline hover:text-gray-700" onClick={() => handleNavigation('privacy-policy')}>
                Política de Privacidade
              </button>
              <p className="text-gray-400 text-xs mt-4">
                Desenvolvido por Diogo Silva
              </p>
            </div>
          </div>
        </footer>

        <Toaster />
      </div>
    </>
  );
}

export default App;