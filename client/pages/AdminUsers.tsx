import React, { useState } from 'react'
import { Users, Search, Plus, Shield, MoreVertical, Trash2, Edit2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockData } from '@/mocks/premium-mock-data'

const statusColors: Record<string, string> = {
  online: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  offline: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  away: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
}

const roleColors: Record<string, { bg: string; text: string; icon: string }> = {
  'Administrador': { bg: 'bg-gradient-to-br from-purple-500/10 to-purple-500/5', text: 'text-purple-300', icon: '👑' },
  'Gerente': { bg: 'bg-gradient-to-br from-blue-500/10 to-blue-500/5', text: 'text-blue-300', icon: '📊' },
  'Atendente': { bg: 'bg-gradient-to-br from-emerald-500/10 to-emerald-500/5', text: 'text-emerald-300', icon: '👤' },
  'Colaborador': { bg: 'bg-gradient-to-br from-orange-500/10 to-orange-500/5', text: 'text-orange-300', icon: '✨' }
}

interface User {
  id: string
  name: string
  email: string
  role: 'Administrador' | 'Gerente' | 'Atendente' | 'Colaborador'
  status: 'online' | 'offline' | 'away'
  setor: string
  avatar: string
}

const MOCK_USERS: User[] = mockData.users.map(u => ({
  id: u.id,
  name: u.name,
  email: u.email,
  role: u.role,
  status: u.status,
  setor: u.sector,
  avatar: u.avatar
}))

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Atendente' as const,
    setor: ''
  })

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddUser = () => {
    if (!formData.name || !formData.email) {
      alert('Preencha todos os campos')
      return
    }

    const newUser: User = {
      id: String(Date.now()),
      ...formData,
      status: 'online',
      avatar: '👤'
    }

    setUsers([...users, newUser])
    setFormData({ name: '', email: '', role: 'Atendente', setor: '' })
    setShowAddModal(false)
  }

  const handleDeleteUser = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
      setUsers(users.filter(u => u.id !== id))
    }
  }

  const handleToggleStatus = (id: string) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const statusMap = { online: 'away', away: 'offline', offline: 'online' }
        return { ...u, status: statusMap[u.status] as any }
      }
      return u
    }))
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-[#1a1a2e] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-2">
              <Shield className="h-8 w-8 text-[#00FF84]" />
              Gerenciamento de Usuários
            </h1>
            <p className="text-gray-400">Total de usuários: <span className="text-[#00FF84] font-semibold">{users.length}</span></p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b border-[#1a1a2e] p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search */}
          <div className="flex-1 relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar por nome ou email…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF84] transition-colors"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-[#00FF84] to-[#00FF95] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00FF84]/30 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            Adicionar Usuário
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="p-6">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto mb-3 text-gray-600" />
            <p className="text-gray-400">Nenhum usuário encontrado</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {/* Table Header - Desktop Only */}
            <div className="hidden md:grid grid-cols-6 gap-4 px-4 py-3 text-xs uppercase font-bold text-gray-400 border-b border-[#1a1a2e]">
              <div>Nome</div>
              <div>Email</div>
              <div>Perfil</div>
              <div>Status</div>
              <div>Setor</div>
              <div>Ações</div>
            </div>

            {/* Table Rows */}
            {filteredUsers.map((user) => {
              const roleInfo = roleColors[user.role]
              return (
                <div
                  key={user.id}
                  className={`border border-[#1a1a2e] rounded-lg p-4 transition-all hover:border-[#00FF84]/50 hover:shadow-lg hover:bg-white/5 ${roleInfo.bg}`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    {/* Name */}
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{user.avatar}</span>
                      <div className="min-w-0">
                        <p className="text-white font-semibold truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 md:hidden">{user.email}</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="hidden md:block">
                      <p className="text-gray-300 text-sm truncate">{user.email}</p>
                    </div>

                    {/* Role */}
                    <div className="hidden md:block">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${roleInfo.text} border border-current/30`}>
                        {roleInfo.icon} {user.role}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="hidden md:block">
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer border transition-all ${statusColors[user.status]} hover:opacity-80`}
                      >
                        <span className={cn('w-2 h-2 rounded-full', {
                          'bg-emerald-500': user.status === 'online',
                          'bg-gray-500': user.status === 'offline',
                          'bg-yellow-500': user.status === 'away'
                        })} />
                        {user.status === 'online' ? 'Online' : user.status === 'away' ? 'Ausente' : 'Offline'}
                      </button>
                    </div>

                    {/* Sector */}
                    <div className="hidden md:block">
                      <p className="text-gray-400 text-sm">{user.setor}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 md:justify-end">
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Mobile Info */}
                  <div className="md:hidden mt-3 pt-3 border-t border-[#1a1a2e] space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Perfil:</span>
                      <span className={roleInfo.text}>{user.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={statusColors[user.status].split(' ')[0]}>{user.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Setor:</span>
                      <span className="text-white">{user.setor}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f0f1e] border border-[#1a1a2e] rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-1">Adicionar Novo Usuário</h2>
            <p className="text-sm text-gray-400 mb-6">Preencha os dados para criar um novo usuário</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF84] transition-colors"
                  placeholder="Digite o nome"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF84] transition-colors"
                  placeholder="Digite o email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Setor</label>
                <input
                  type="text"
                  value={formData.setor}
                  onChange={(e) => setFormData({ ...formData, setor: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF84] transition-colors"
                  placeholder="Digite o setor"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Perfil</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full px-4 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] text-white focus:outline-none focus:border-[#00FF84] transition-colors"
                >
                  <option value="Atendente">Atendente</option>
                  <option value="Gerente">Gerente</option>
                  <option value="Colaborador">Colaborador</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] text-white hover:bg-[#2a2a3e] transition-colors font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddUser}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00FF84] to-[#00FF95] text-black hover:shadow-lg hover:shadow-[#00FF84]/30 transition-all font-semibold"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
