import React, { useState } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'

interface Sector {
  id: string
  name: string
  color: string
  description: string
}

const MOCK_SECTORS: Sector[] = [
  {
    id: '1',
    name: 'BOAS VINDAS',
    color: '#FF00FF',
    description: '🎉Olá, aqui é a Dra. Francini e equipe. Qu...'
  },
  {
    id: '2',
    name: 'COMERCIAL',
    color: '#00FF00',
    description: 'Setor responsável por vendas e negociações'
  },
  {
    id: '3',
    name: 'DIGITAL',
    color: '#FFAA00',
    description: 'Estratégias de marketing digital e online'
  },
  {
    id: '4',
    name: 'FINANCEIRO',
    color: '#0066FF',
    description: 'Olá, vocês está no Setor Financeiro. Agu...'
  },
  {
    id: '5',
    name: 'SUPORTE AO CLIENTE',
    color: '#FF00FF',
    description: 'Bem vindo ao Canal de "Suporte ao Clie...'
  }
]

export default function AdminSectors() {
  const [sectors, setSectors] = useState<Sector[]>(MOCK_SECTORS)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingSector, setEditingSector] = useState<Sector | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    color: '#00FF9A',
    description: ''
  })

  const handleOpenAddModal = () => {
    setEditingSector(null)
    setFormData({ name: '', color: '#00FF9A', description: '' })
    setShowAddModal(true)
  }

  const handleOpenEditModal = (sector: Sector) => {
    setEditingSector(sector)
    setFormData({
      name: sector.name,
      color: sector.color,
      description: sector.description
    })
    setShowAddModal(true)
  }

  const handleSaveSector = () => {
    if (!formData.name) {
      alert('Preencha o nome do setor')
      return
    }

    if (editingSector) {
      setSectors(sectors.map(s =>
        s.id === editingSector.id
          ? { ...s, ...formData }
          : s
      ))
    } else {
      const newSector: Sector = {
        id: String(Date.now()),
        ...formData
      }
      setSectors([...sectors, newSector])
    }

    setShowAddModal(false)
    setFormData({ name: '', color: '#00FF9A', description: '' })
    setEditingSector(null)
  }

  const handleDeleteSector = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este setor?')) {
      setSectors(sectors.filter(s => s.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-[#070707]">
      {/* Header */}
      <div className="border-b border-[#00FF9A]/20 p-6">
        <h1 className="text-3xl font-bold text-white mb-2">Setores</h1>
        <p className="text-gray-400">Gerencie os setores da plataforma</p>
      </div>

      {/* Toolbar */}
      <div className="border-b border-[#00FF9A]/20 p-6">
        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2 bg-[#00FF9A] text-black font-semibold rounded-lg hover:bg-[#00CC7A] transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          + ADICIONAR SETOR
        </button>
      </div>

      {/* Sectors Grid/Table */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#00FF9A]/20 text-gray-400 text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-4 font-semibold">Nome</th>
                <th className="text-left px-6 py-4 font-semibold">Cor</th>
                <th className="text-left px-6 py-4 font-semibold">Descrição</th>
                <th className="text-left px-6 py-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {sectors.map((sector) => (
                <tr
                  key={sector.id}
                  className="border-b border-[#00FF9A]/10 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{sector.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded border border-[#00FF9A]/20"
                        style={{ backgroundColor: sector.color }}
                      />
                      <span className="text-gray-400 text-xs font-mono">{sector.color}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 max-w-xs truncate">{sector.description}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenEditModal(sector)}
                        className="px-2 py-1 text-xs rounded bg-[#00FF9A]/20 text-[#00FF9A] hover:bg-[#00FF9A]/30 transition-colors flex items-center gap-1"
                      >
                        <Edit2 className="h-3 w-3" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteSector(sector.id)}
                        className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        Deletar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Sector Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0F0F0F] border border-[#00FF9A]/20 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold text-white mb-4">
              {editingSector ? 'Editar Setor' : 'Adicionar Novo Setor'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nome do Setor</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#00FF9A]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF9A]"
                  placeholder="Ex: Vendas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Cor</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="h-10 w-20 rounded-lg cursor-pointer border border-[#00FF9A]/20"
                  />
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-[#00FF9A]/20 text-white text-sm font-mono focus:outline-none focus:border-[#00FF9A]"
                    placeholder="#00FF9A"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#00FF9A]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF9A] resize-none"
                  placeholder="Digite uma descrição"
                  rows={4}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveSector}
                className="flex-1 px-4 py-2 rounded-lg bg-[#00FF9A] text-black hover:bg-[#00CC7A] transition-colors font-medium"
              >
                {editingSector ? 'Atualizar' : 'Adicionar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
