import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { resetApp } from "./utils/reset";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import CRM from "./pages/CRM";
import CRMAdvanced from "./pages/CRMAdvanced";
import TopNavBar from "./components/TopNavBar";
import { CRMProvider } from "./context/CRMContext";
import { ContactSidebarProvider } from "./hooks/useContactSidebar";

// Additional pages
import Conversas from "./pages/Conversas";
import Disparo from "./pages/Disparo";
import Agendamento from "./pages/Agendamento";
import Tags from "./pages/Tags";
import Contatos from "./pages/Contatos";
import Mensagens from "./pages/Mensagens";
import AdminPanel from "./pages/AdminPanel";

const queryClient = new QueryClient();

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen bg-[#070707]">
      {/* Top Navigation */}
      <TopNavBar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CRMProvider>
        <ContactSidebarProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {showSplash && (
              <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fc7a665936108422ea7c0c4c7a1027698%2Ff4f6d8a8cede428fa0c26b651908a2f8?format=webp&width=800"
                  alt="Funcionou.AI"
                  className="h-40 w-40 animate-fade-in"
                />
              </div>
            )}
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />

                {/* Dashboard - Home */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedLayout>
                      <Dashboard />
                    </ProtectedLayout>
                  }
                />

                {/* Conversas */}
                <Route
                  path="/conversas"
                  element={
                    <ProtectedLayout>
                      <Conversas />
                    </ProtectedLayout>
                  }
                />

                {/* CRM - Kanban Main */}
                <Route
                  path="/crm/kanban"
                  element={
                    <ProtectedLayout>
                      <CRM />
                    </ProtectedLayout>
                  }
                />

                {/* CRM - Contatos */}
                <Route
                  path="/crm/contatos"
                  element={
                    <ProtectedLayout>
                      <Contatos />
                    </ProtectedLayout>
                  }
                />

                {/* CRM - Mensagens */}
                <Route
                  path="/crm/mensagens"
                  element={
                    <ProtectedLayout>
                      <Mensagens />
                    </ProtectedLayout>
                  }
                />

                {/* CRM - Tags */}
                <Route
                  path="/crm/tags"
                  element={
                    <ProtectedLayout>
                      <Tags />
                    </ProtectedLayout>
                  }
                />

                {/* Disparo em Massa */}
                <Route
                  path="/disparo"
                  element={
                    <ProtectedLayout>
                      <Disparo />
                    </ProtectedLayout>
                  }
                />

                {/* Atendimentos - Kanban */}
                <Route
                  path="/atendimentos/kanban"
                  element={
                    <ProtectedLayout>
                      <div className="w-full h-full p-6">
                        <h1 className="text-3xl font-bold text-white mb-6">
                          Atendimentos - Modo Kanban
                        </h1>
                        <p className="text-gray-400">
                          Página de Kanban dos Atendimentos
                        </p>
                      </div>
                    </ProtectedLayout>
                  }
                />

                {/* Atendimentos - Agendamentos */}
                <Route
                  path="/atendimentos/agendamentos"
                  element={
                    <ProtectedLayout>
                      <Agendamento />
                    </ProtectedLayout>
                  }
                />

                {/* Atendimentos - Mensagens */}
                <Route
                  path="/atendimentos/mensagens"
                  element={
                    <ProtectedLayout>
                      <div className="w-full h-full p-6">
                        <h1 className="text-3xl font-bold text-white mb-6">
                          Atendimentos - Mensagens
                        </h1>
                        <p className="text-gray-400">
                          Página de Mensagens dos Atendimentos
                        </p>
                      </div>
                    </ProtectedLayout>
                  }
                />

                {/* Adm - User Admin Panel */}
                <Route
                  path="/adm"
                  element={<Navigate to="/adm/usuarios" replace />}
                />

                <Route
                  path="/adm/usuarios"
                  element={
                    <ProtectedLayout>
                      <AdminPanel activeTab="usuarios" />
                    </ProtectedLayout>
                  }
                />

                <Route
                  path="/adm/setores"
                  element={
                    <ProtectedLayout>
                      <AdminPanel activeTab="setores" />
                    </ProtectedLayout>
                  }
                />

                {/* Admin area (separate module). Login at /admin */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route
                  path="/admin/*"
                  element={
                    // Admin uses its own internal layout and auth
                    <Admin />
                  }
                />

                {/* Configurações - Gerais */}
                <Route
                  path="/configuracoes"
                  element={
                    <ProtectedLayout>
                      <div className="w-full h-full p-6">
                        <h1 className="text-3xl font-bold text-white mb-6">
                          Configurações Gerais
                        </h1>
                        <p className="text-gray-400">
                          Configurações gerais do sistema
                        </p>
                      </div>
                    </ProtectedLayout>
                  }
                />

                {/* Configurações - Conexões */}
                <Route
                  path="/configuracoes/conexoes"
                  element={
                    <ProtectedLayout>
                      <div className="w-full h-full p-6">
                        <h1 className="text-3xl font-bold text-white mb-6">
                          Configurações - Conexões
                        </h1>
                        <p className="text-gray-400">
                          Gerencia de integrações e conexões
                        </p>
                      </div>
                    </ProtectedLayout>
                  }
                />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ContactSidebarProvider>
      </CRMProvider>
    </QueryClientProvider>
  );
};

const container = document.getElementById("root")!;
if (!(window as any).__root) {
  (window as any).__root = createRoot(container);
}
(window as any).__root.render(<App />);
