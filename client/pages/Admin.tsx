import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { mockDB, Client, User } from "@/services/mockDB";
import SectorsManagement from "@/components/SectorsManagement";
import UsersManagement from "@/components/UsersManagement";

type AdminTab =
  | "integracoes"
  | "usuarios"
  | "mensagens"
  | "setores"
  | "colaboradores";

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Detect active tab from URL
  const getActiveTabFromURL = (): AdminTab => {
    if (location.pathname.includes("/admin/usuarios")) return "usuarios";
    if (location.pathname.includes("/admin/setores")) return "setores";
    return "integracoes";
  };

  const [activeTab, setActiveTab] = useState<AdminTab>(getActiveTabFromURL());

  const [clients, setClients] = useState<Client[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modals
  const [showClientModal, setShowClientModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [clientForm, setClientForm] = useState({ name: "", phone: "" });
  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
    role: "agent" as const,
    clientId: "",
  });

  // Filters
  const [messageFilterClient, setMessageFilterClient] = useState<string>("all");
  const [messageFilterDirection, setMessageFilterDirection] =
    useState<string>("all");

  // Auth check on mount and location change
  useEffect(() => {
    const isAdminAuth = localStorage.getItem("adminAuth");

    // If no admin session, redirect to admin login
    if (!isAdminAuth) {
      navigate("/admin", { replace: true });
      return;
    }

    setIsAdmin(true);
    setChecking(false);
    setActiveTab(getActiveTabFromURL());
  }, [navigate, location.pathname]);

  // Load data based on active tab
  useEffect(() => {
    if (!isAdmin) return;

    if (activeTab === "integracoes") {
      loadClients();
    } else if (activeTab === "usuarios") {
      loadUsers();
    } else if (activeTab === "mensagens") {
      loadMessages();
    }
  }, [activeTab, isAdmin]);

  // Simulate loading delay
  function simulateLoading<T>(fn: () => T): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fn());
      }, 200);
    });
  }

  async function loadClients() {
    try {
      setLoading(true);
      setError(null);
      await simulateLoading(() => {
        setClients(mockDB.getClients());
      });
    } catch (err) {
      console.error("Error loading clients:", err);
      setError("Falha ao carregar clientes");
    } finally {
      setLoading(false);
    }
  }

  async function loadUsers() {
    try {
      setLoading(true);
      setError(null);
      await simulateLoading(() => {
        setUsers(mockDB.getUsers());
      });
    } catch (err) {
      console.error("Error loading users:", err);
      setError("Falha ao carregar usuários");
    } finally {
      setLoading(false);
    }
  }

  async function loadMessages() {
    try {
      setLoading(true);
      setError(null);
      await simulateLoading(() => {
        setMessages([...mockDB.messages].reverse().slice(0, 100));
      });
    } catch (err) {
      console.error("Error loading messages:", err);
      setError("Falha ao carregar mensagens");
    } finally {
      setLoading(false);
    }
  }

  // Client operations
  async function handleAddClient() {
    if (!clientForm.name || !clientForm.phone) {
      setError("Preencha todos os campos");
      return;
    }
    try {
      mockDB.addClient(clientForm.name, clientForm.phone);
      setClientForm({ name: "", phone: "" });
      setShowClientModal(false);
      loadClients();
    } catch (err) {
      setError("Erro ao adicionar cliente");
    }
  }

  async function handleUpdateClient() {
    if (!editingClient || !clientForm.name || !clientForm.phone) {
      setError("Preencha todos os campos");
      return;
    }
    try {
      mockDB.updateClient(editingClient.id, {
        name: clientForm.name,
        phone: clientForm.phone,
      });
      setClientForm({ name: "", phone: "" });
      setEditingClient(null);
      setShowClientModal(false);
      loadClients();
    } catch (err) {
      setError("Erro ao atualizar cliente");
    }
  }

  function handleDeleteClient(id: string) {
    if (confirm("Tem certeza que deseja deletar este cliente?")) {
      mockDB.deleteClient(id);
      loadClients();
    }
  }

  function openEditClientModal(client: Client) {
    setEditingClient(client);
    setClientForm({ name: client.name, phone: client.phone });
    setShowClientModal(true);
  }

  // User operations
  async function handleAddUser() {
    if (!userForm.username || !userForm.password) {
      setError("Preencha username e senha");
      return;
    }
    try {
      mockDB.addUser(
        userForm.username,
        userForm.password,
        userForm.role as "admin" | "agent",
        userForm.clientId || undefined,
      );
      setUserForm({ username: "", password: "", role: "agent", clientId: "" });
      setShowUserModal(false);
      loadUsers();
    } catch (err) {
      setError("Erro ao adicionar usuário");
    }
  }

  async function handleUpdateUser() {
    if (!editingUser || !userForm.username) {
      setError("Preencha username");
      return;
    }
    try {
      mockDB.updateUser(editingUser.id, {
        username: userForm.username,
        password: userForm.password || editingUser.password,
        role: userForm.role as "admin" | "agent",
        client_id: userForm.clientId || null,
      });
      setUserForm({ username: "", password: "", role: "agent", clientId: "" });
      setEditingUser(null);
      setShowUserModal(false);
      loadUsers();
    } catch (err) {
      setError("Erro ao atualizar usuário");
    }
  }

  function handleDeleteUser(id: string) {
    if (confirm("Tem certeza que deseja deletar este usuário?")) {
      mockDB.deleteUser(id);
      loadUsers();
    }
  }

  function openEditUserModal(user: User) {
    setEditingUser(user);
    setUserForm({
      username: user.username,
      password: "",
      role: user.role,
      clientId: user.client_id || "",
    });
    setShowUserModal(true);
  }

  function handleDeleteMessage(id: string) {
    if (confirm("Tem certeza?")) {
      mockDB.deleteMessage(id);
      loadMessages();
    }
  }

  function handleExportData() {
    const data = mockDB.exportData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mockDB-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImportData() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          const data = JSON.parse(event.target.result);
          if (mockDB.importData(data)) {
            setError(null);
            alert("Dados importados com sucesso!");
            loadClients();
            loadUsers();
            loadMessages();
          } else {
            setError("Erro ao importar dados");
          }
        } catch (err) {
          setError("Arquivo JSON inválido");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  const handleLogout = () => {
    // Clear only admin-related keys
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminUser')
    navigate('/admin', { replace: true })
  };

  const filteredMessages = messages.filter((m) => {
    if (messageFilterClient !== "all" && m.client_id !== messageFilterClient)
      return false;
    if (
      messageFilterDirection !== "all" &&
      m.direction !== messageFilterDirection
    )
      return false;
    return true;
  });

  if (checking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <div className="mb-2 text-lg font-semibold">
            Verificando permissões...
          </div>
          <div className="text-sm text-[var(--text-secondary)]">
            Aguarde um momento
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-black text-[var(--text-primary)] font-sans">
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 bg-[#000] border-b z-40"
        style={{ borderColor: "rgba(0,255,136,0.06)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fc7a665936108422ea7c0c4c7a1027698%2F62bee75c9cf54f7db5c6005f17af3083?format=webp&width=800"
              alt="Funcionou.AI"
              className="h-8 w-8 rounded-md"
            />
            <div className="text-sm font-semibold neon">Funcionou.AI</div>
          </div>

          <div className="text-lg font-semibold">Painel Administrativo</div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md bg-[var(--neon-green)] text-black font-semibold text-sm"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div
            className="flex gap-4 mb-6 border-b overflow-x-auto"
            style={{ borderColor: "rgba(0,255,136,0.06)" }}
          >
            {(
              [
                "integracoes",
                "usuarios",
                "mensagens",
                "setores",
                "colaboradores",
              ] as const
            ).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-semibold transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "text-[var(--neon-green)] border-b-2"
                    : "text-[var(--text-secondary)]"
                }`}
                style={{
                  borderColor:
                    activeTab === tab ? "rgba(0,255,136,1)" : "transparent",
                }}
              >
                {tab === "integracoes" && "Integrações"}
                {tab === "usuarios" && "Usuários"}
                {tab === "mensagens" && "Mensagens"}
                {tab === "setores" && "Setores"}
                {tab === "colaboradores" && "Colaboradores"}
              </button>
            ))}
          </div>

          {/* Content */}
          <div
            className="rounded-2xl bg-[#0F0F0F] border p-6"
            style={{ borderColor: "rgba(0,255,136,0.06)" }}
          >
            {error && (
              <div className="mb-4 text-sm text-white bg-red-600/10 border border-red-600/30 rounded-md p-2">
                {error}
              </div>
            )}

            {activeTab === "setores" ? (
              <SectorsManagement />
            ) : activeTab === "colaboradores" ? (
              <UsersManagement />
            ) : loading ? (
              <div className="text-center text-sm text-[var(--text-secondary)] py-8">
                Carregando dados...
              </div>
            ) : activeTab === "integracoes" ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Clientes Integrados ({clients.length})
                  </h3>
                  <button
                    onClick={() => {
                      setEditingClient(null);
                      setClientForm({ name: "", phone: "" });
                      setShowClientModal(true);
                    }}
                    className="px-3 py-2 rounded-md bg-[var(--neon-green)] text-black font-semibold text-sm"
                  >
                    + Novo Cliente
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr
                        className="border-b"
                        style={{ borderColor: "rgba(0,255,136,0.06)" }}
                      >
                        <th className="text-left py-2 px-4">Nome</th>
                        <th className="text-left py-2 px-4">Telefone</th>
                        <th className="text-left py-2 px-4">Token</th>
                        <th className="text-left py-2 px-4">Criado em</th>
                        <th className="text-left py-2 px-4">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((c) => (
                        <tr
                          key={c.id}
                          className="border-b"
                          style={{ borderColor: "rgba(0,255,136,0.06)" }}
                        >
                          <td className="py-2 px-4">{c.name}</td>
                          <td className="py-2 px-4 font-mono text-xs">
                            {c.phone}
                          </td>
                          <td className="py-2 px-4 font-mono text-xs">
                            {c.token}
                          </td>
                          <td className="py-2 px-4 text-xs">
                            {new Date(c.created_at).toLocaleDateString("pt-BR")}
                          </td>
                          <td className="py-2 px-4 text-xs">
                            <button
                              onClick={() => openEditClientModal(c)}
                              className="text-[var(--neon-green)] hover:underline mr-3"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteClient(c.id)}
                              className="text-red-500 hover:underline"
                            >
                              Deletar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : activeTab === "usuarios" ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Usuários do Sistema ({users.length})
                  </h3>
                  <button
                    onClick={() => {
                      setEditingUser(null);
                      setUserForm({
                        username: "",
                        password: "",
                        role: "agent",
                        clientId: "",
                      });
                      setShowUserModal(true);
                    }}
                    className="px-3 py-2 rounded-md bg-[var(--neon-green)] text-black font-semibold text-sm"
                  >
                    + Novo Usuário
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr
                        className="border-b"
                        style={{ borderColor: "rgba(0,255,136,0.06)" }}
                      >
                        <th className="text-left py-2 px-4">Username</th>
                        <th className="text-left py-2 px-4">Role</th>
                        <th className="text-left py-2 px-4">Cliente</th>
                        <th className="text-left py-2 px-4">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => {
                        const userClient = clients.find(
                          (c) => c.id === u.client_id,
                        );
                        return (
                          <tr
                            key={u.id}
                            className="border-b"
                            style={{ borderColor: "rgba(0,255,136,0.06)" }}
                          >
                            <td className="py-2 px-4 font-mono">
                              {u.username}
                            </td>
                            <td className="py-2 px-4">
                              <span
                                className={`px-2 py-1 rounded text-xs ${u.role === "admin" ? "bg-[var(--neon-green)] text-black" : "bg-[#222] text-white"}`}
                              >
                                {u.role}
                              </span>
                            </td>
                            <td className="py-2 px-4 text-xs">
                              {userClient ? userClient.name : "-"}
                            </td>
                            <td className="py-2 px-4 text-xs">
                              <button
                                onClick={() => openEditUserModal(u)}
                                className="text-[var(--neon-green)] hover:underline mr-3"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleDeleteUser(u.id)}
                                className="text-red-500 hover:underline"
                              >
                                Deletar
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Auditoria de Mensagens ({filteredMessages.length})
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleExportData}
                      className="px-3 py-2 rounded-md bg-[#222] text-white font-semibold text-sm hover:bg-[#333]"
                    >
                      📥 Exportar DB
                    </button>
                    <button
                      onClick={handleImportData}
                      className="px-3 py-2 rounded-md bg-[#222] text-white font-semibold text-sm hover:bg-[#333]"
                    >
                      📤 Importar DB
                    </button>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Cliente</label>
                    <select
                      value={messageFilterClient}
                      onChange={(e) => setMessageFilterClient(e.target.value)}
                      className="w-full rounded-lg bg-transparent border px-3 py-2 outline-none text-sm"
                      style={{ borderColor: "rgba(255,255,255,0.06)" }}
                    >
                      <option value="all">Todos</option>
                      {clients.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Direção</label>
                    <select
                      value={messageFilterDirection}
                      onChange={(e) =>
                        setMessageFilterDirection(e.target.value)
                      }
                      className="w-full rounded-lg bg-transparent border px-3 py-2 outline-none text-sm"
                      style={{ borderColor: "rgba(255,255,255,0.06)" }}
                    >
                      <option value="all">Todas</option>
                      <option value="inbound">Entrada</option>
                      <option value="outbound">Saída</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr
                        className="border-b"
                        style={{ borderColor: "rgba(0,255,136,0.06)" }}
                      >
                        <th className="text-left py-2 px-4">Cliente ID</th>
                        <th className="text-left py-2 px-4">Contato ID</th>
                        <th className="text-left py-2 px-4">Mensagem</th>
                        <th className="text-left py-2 px-4">Direção</th>
                        <th className="text-left py-2 px-4">Timestamp</th>
                        <th className="text-left py-2 px-4">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMessages.map((m) => (
                        <tr
                          key={m.id}
                          className="border-b"
                          style={{ borderColor: "rgba(0,255,136,0.06)" }}
                        >
                          <td className="py-2 px-4 text-xs font-mono">
                            {m.client_id}
                          </td>
                          <td className="py-2 px-4 text-xs font-mono">
                            {m.contact_id}
                          </td>
                          <td className="py-2 px-4 text-xs truncate max-w-xs">
                            {m.text}
                          </td>
                          <td className="py-2 px-4 text-xs">
                            <span
                              className={`${m.direction === "inbound" ? "text-[var(--neon-green)]" : "text-yellow-400"}`}
                            >
                              {m.direction === "inbound" ? "Entrada" : "Saída"}
                            </span>
                          </td>
                          <td className="py-2 px-4 text-xs">
                            {new Date(m.timestamp).toLocaleString("pt-BR")}
                          </td>
                          <td className="py-2 px-4 text-xs">
                            <button
                              onClick={() => handleDeleteMessage(m.id)}
                              className="text-red-500 hover:underline"
                            >
                              Deletar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Client Modal */}
      {showClientModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-[#0F0F0F] border rounded-lg p-6 max-w-md w-full"
            style={{ borderColor: "rgba(0,255,136,0.06)" }}
          >
            <h2 className="text-lg font-semibold mb-4">
              {editingClient ? "Editar Cliente" : "Novo Cliente"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Nome</label>
                <input
                  type="text"
                  value={clientForm.name}
                  onChange={(e) =>
                    setClientForm({ ...clientForm, name: e.target.value })
                  }
                  className="w-full rounded-lg bg-transparent border px-3 py-2 outline-none text-sm"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  placeholder="Nome do cliente"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Telefone</label>
                <input
                  type="text"
                  value={clientForm.phone}
                  onChange={(e) =>
                    setClientForm({ ...clientForm, phone: e.target.value })
                  }
                  className="w-full rounded-lg bg-transparent border px-3 py-2 outline-none text-sm"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  placeholder="+55 27 99999-0000"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowClientModal(false);
                    setEditingClient(null);
                  }}
                  className="px-4 py-2 rounded-md bg-[#222] text-white hover:bg-[#333]"
                >
                  Cancelar
                </button>
                <button
                  onClick={editingClient ? handleUpdateClient : handleAddClient}
                  className="px-4 py-2 rounded-md bg-[var(--neon-green)] text-black font-semibold"
                >
                  {editingClient ? "Atualizar" : "Criar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-[#0F0F0F] border rounded-lg p-6 max-w-md w-full"
            style={{ borderColor: "rgba(0,255,136,0.06)" }}
          >
            <h2 className="text-lg font-semibold mb-4">
              {editingUser ? "Editar Usuário" : "Novo Usuário"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Username</label>
                <input
                  type="text"
                  value={userForm.username}
                  onChange={(e) =>
                    setUserForm({ ...userForm, username: e.target.value })
                  }
                  className="w-full rounded-lg bg-transparent border px-3 py-2 outline-none text-sm"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  placeholder="Username"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">
                  Senha {editingUser && "(deixe em branco para manter)"}
                </label>
                <input
                  type="password"
                  value={userForm.password}
                  onChange={(e) =>
                    setUserForm({ ...userForm, password: e.target.value })
                  }
                  className="w-full rounded-lg bg-transparent border px-3 py-2 outline-none text-sm"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  placeholder="Senha"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Role</label>
                <select
                  value={userForm.role}
                  onChange={(e) =>
                    setUserForm({
                      ...userForm,
                      role: e.target.value as "admin" | "agent",
                    })
                  }
                  className="w-full rounded-lg bg-transparent border px-3 py-2 outline-none text-sm"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <option value="admin">Admin</option>
                  <option value="agent">Agent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Cliente (se agent)</label>
                <select
                  value={userForm.clientId}
                  onChange={(e) =>
                    setUserForm({ ...userForm, clientId: e.target.value })
                  }
                  className="w-full rounded-lg bg-transparent border px-3 py-2 outline-none text-sm"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <option value="">Nenhum</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowUserModal(false);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 rounded-md bg-[#222] text-white hover:bg-[#333]"
                >
                  Cancelar
                </button>
                <button
                  onClick={editingUser ? handleUpdateUser : handleAddUser}
                  className="px-4 py-2 rounded-md bg-[var(--neon-green)] text-black font-semibold"
                >
                  {editingUser ? "Atualizar" : "Criar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
