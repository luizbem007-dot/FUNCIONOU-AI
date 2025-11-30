import React, { useState } from 'react'
import { Plus, Edit2, Trash2, X, Shield, Users as UsersIcon } from 'lucide-react'
import { useCRM } from '@/context/CRMContext'
import { cn } from '@/lib/utils'

export default function UsersManagement() {
  const { users, sectors, addUser, updateUser, deleteUser } = useCRM()
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'attendant' as 'admin' | 'attendant',
    sector: '',
    status: 'offline' as 'online' | 'offline' | 'away'
  })

  const handleOpenModal = (userId?: string) => {
    if (userId) {
      const user = users.find(u => u.id === userId)
      if (user) {
        setFormData({
          name: user.name,
          email: user.email,
          role: user.role,
          sector: user.sector || '',
          status: user.status
        })
        setEditingUser(userId)
      }
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'attendant',
        sector: '',
        status: 'offline'
      })
      setEditingUser(null)
    }
    setShowModal(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingUser) {
      updateUser(editingUser, formData)
    } else {
      addUser({
        ...formData,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`
      })
    }
    setShowModal(false)
  }

  const handleDelete = (userId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      deleteUser(userId)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Colaboradores</h2>
          <p className="text-[#999]">Gerenciar usuários e permissões</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 rounded-lg font-semibold text-black transition-all hover:shadow-lg hover:shadow-[#00FF9A]/30 flex items-center gap-2"
          style={{ backgroundColor: '#00FF9A' }}
        >
          <Plus className="h-4 w-4" />
          Novo Usuário
        </button>
      </div>

      {/* Users Table */}
      <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'rgba(0,255,154,0.1)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Header */}
            <thead>
              <tr className="border-b" style={{ borderColor: 'rgba(0,255,154,0.1)' }}>
                <th className="px-6 py-4 text-left text-[#999] font-semibold">Nome</th>
                <th className="px-6 py-4 text-left text-[#999] font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-[#999] font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-[#999] font-semibold">Função</th>
                <th className="px-6 py-4 text-left text-[#999] font-semibold">Setor</th>
                <th className="px-6 py-4 text-right text-[#999] font-semibold">Ações</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-[#0F0F0F]/50 transition-colors" style={{ borderColor: 'rgba(0,255,154,0.06)' }}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                      <span className="text-white font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#999]">{user.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        'w-2 h-2 rounded-full',
                        user.status === 'online' && 'bg-[#00FF9A]',
                        user.status === 'away' && 'bg-[#FFB800]',
                        user.status === 'offline' && 'bg-[#666]'
                      )} />
                      <span className="text-[#999] text-xs capitalize">
                        {user.status === 'online' && 'Online'}
                        {user.status === 'away' && 'Ausente'}
                        {user.status === 'offline' && 'Offline'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-[#00D4FF]/10 text-[#00D4FF]">
                      {user.role === 'admin' ? 'Administrador' : 'Atendente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#999]">
                    {user.sector ? sectors.find(s => s.id === user.sector)?.name : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(user.id)}
                        className="p-2 hover:bg-[#1A1A1A] rounded transition-colors text-[#00D4FF]"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      {user.id !== 'user-1' && (
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 hover:bg-red-500/20 rounded transition-colors text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0F0F0F] rounded-lg border w-full max-w-md" style={{ borderColor: 'rgba(0,255,154,0.2)' }}>
            {/* Header */}
            <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: 'rgba(0,255,154,0.1)' }}>
              <h3 className="font-bold text-lg">{editingUser ? 'Editar Usuário' : 'Novo Usuário'}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-[#1A1A1A] rounded transition-colors"
              >
                <X className="h-5 w-5 text-[#666]" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-[#999] mb-2 block">Nome *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-white"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#999] mb-2 block">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-white"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#999] mb-2 block">Função</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-white"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <option value="attendant">Atendente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-[#999] mb-2 block">Setor</label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-white"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <option value="">Sem setor</option>
                  {sectors.map(sector => (
                    <option key={sector.id} value={sector.id}>{sector.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-[#999] mb-2 block">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-white"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <option value="online">Online</option>
                  <option value="away">Ausente</option>
                  <option value="offline">Offline</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t" style={{ borderColor: 'rgba(0,255,154,0.1)' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border transition-colors hover:bg-[#1A1A1A]"
                  style={{ borderColor: 'rgba(0,255,154,0.2)' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg font-semibold text-black transition-all hover:shadow-lg hover:shadow-[#00FF9A]/30"
                  style={{ backgroundColor: '#00FF9A' }}
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
