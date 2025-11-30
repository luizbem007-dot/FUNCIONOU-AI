import React, { useState } from 'react'
import { Users } from 'lucide-react'
import { MOCK_USERS } from '@/mocks/users.mock'
import PagePlaceholder from '@/components/PagePlaceholder'
import Modal from '@/components/Modal'
import { cn } from '@/lib/utils'

const statusColors: Record<string, string> = {
  online: 'bg-green-500/20 text-green-300',
  offline: 'bg-gray-500/20 text-gray-300',
  away: 'bg-yellow-500/20 text-yellow-300'
}

const roleColors: Record<string, string> = {
  Administrador: 'bg-[#00FF9A]/20 text-[#00FF9A]',
  Gerente: 'bg-blue-500/20 text-blue-300',
  Atendente: 'bg-purple-500/20 text-purple-300'
}

export default function UsuariosPage() {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Atendente'
  })

  const handleAddUser = () => {
    setShowModal(true)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    console.log('Add user:', formData)
    setShowModal(false)
    setFormData({ name: '', email: '', role: 'Atendente' })
  }

  return (
    <div className="min-h-screen bg-[#070707]">
      <PagePlaceholder
        title="Usuários"
        description="Gerencie os usuários do sistema"
        icon="👥"
        actions={[
          {
            label: '+ ADICIONAR USUÁRIO',
            onClick: handleAddUser,
            variant: 'primary'
          }
        ]}
      >
        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#00FF9A]/20 sticky top-0 bg-[#0b0b0b]">
              <tr className="text-gray-400 text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-4 font-semibold">Nome</th>
                <th className="text-left px-6 py-4 font-semibold">Email</th>
                <th className="text-left px-6 py-4 font-semibold">Perfil</th>
                <th className="text-left px-6 py-4 font-semibold">Status</th>
                <th className="text-left px-6 py-4 font-semibold">Setor</th>
                <th className="text-left px-6 py-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#00FF9A]/10">
              {MOCK_USERS.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-white/5 transition-colors border-b border-[#00FF9A]/10"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF9A] to-[#00FF9A]/40" />
                      <span className="text-white font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={cn('px-2 py-1 rounded text-xs font-medium', roleColors[user.role])}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={cn('w-2 h-2 rounded-full', {
                        'bg-green-500': user.status === 'online',
                        'bg-gray-500': user.status === 'offline',
                        'bg-yellow-500': user.status === 'away'
                      })} />
                      <span className={cn('text-xs font-medium', statusColors[user.status])}>
                        {user.status === 'online' ? 'Online' : user.status === 'away' ? 'Ausente' : 'Offline'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{user.setor}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-2 py-1 text-xs rounded bg-[#00FF9A]/20 text-[#00FF9A] hover:bg-[#00FF9A]/30 transition-colors">
                        Editar
                      </button>
                      <button className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors">
                        Bloquear
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PagePlaceholder>

      {/* Modal para adicionar usuário */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-6">Adicionar Novo Usuário</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Digite o nome do usuário"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#00FF9A]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF9A]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Digite o email"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#00FF9A]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF9A]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Perfil</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#00FF9A]/20 text-white focus:outline-none focus:border-[#00FF9A]"
                >
                  <option value="Atendente">Atendente</option>
                  <option value="Gerente">Gerente</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 rounded-lg bg-[#00FF9A] text-black hover:bg-[#00FF9A]/80 transition-colors font-medium"
              >
                Adicionar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
