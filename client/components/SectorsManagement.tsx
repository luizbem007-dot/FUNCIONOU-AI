import React, { useState } from 'react'
import { Plus, Edit2, Trash2, X } from 'lucide-react'
import { useCRM } from '@/context/CRMContext'
import { cn } from '@/lib/utils'

export default function SectorsManagement() {
  const { sectors, addSector, updateSector, deleteSector } = useCRM()
  const [showModal, setShowModal] = useState(false)
  const [editingSector, setEditingSector] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    color: '#00FF9A',
    greetingMessage: ''
  })

  const handleOpenModal = (sectorId?: string) => {
    if (sectorId) {
      const sector = sectors.find(s => s.id === sectorId)
      if (sector) {
        setFormData({
          name: sector.name,
          color: sector.color,
          greetingMessage: sector.greetingMessage
        })
        setEditingSector(sectorId)
      }
    } else {
      setFormData({
        name: '',
        color: '#00FF9A',
        greetingMessage: ''
      })
      setEditingSector(null)
    }
    setShowModal(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingSector) {
      updateSector(editingSector, formData)
    } else {
      addSector(formData)
    }
    setShowModal(false)
  }

  const handleDelete = (sectorId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este setor?')) {
      deleteSector(sectorId)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Setores</h2>
          <p className="text-[#999]">Gerenciar departamentos e setores da empresa</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 rounded-lg font-semibold text-black transition-all hover:shadow-lg hover:shadow-[#00FF9A]/30 flex items-center gap-2"
          style={{ backgroundColor: '#00FF9A' }}
        >
          <Plus className="h-4 w-4" />
          Novo Setor
        </button>
      </div>

      {/* Sectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sectors.map(sector => (
          <div key={sector.id} className="p-4 rounded-lg border" style={{ borderColor: 'rgba(0,255,154,0.1)', backgroundColor: 'rgba(10,10,10,0.8)' }}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: sector.color }}
                />
                <h3 className="font-semibold text-white">{sector.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(sector.id)}
                  className="p-2 hover:bg-[#1A1A1A] rounded transition-colors text-[#00D4FF]"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(sector.id)}
                  className="p-2 hover:bg-red-500/20 rounded transition-colors text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-[#999]">{sector.greetingMessage}</p>

            <div className="mt-3 text-xs text-[#666]">
              Criado em {new Date(sector.createdAt).toLocaleDateString('pt-BR')}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0F0F0F] rounded-lg border w-full max-w-md" style={{ borderColor: 'rgba(0,255,154,0.2)' }}>
            {/* Header */}
            <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: 'rgba(0,255,154,0.1)' }}>
              <h3 className="font-bold text-lg">{editingSector ? 'Editar Setor' : 'Novo Setor'}</h3>
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
                <label className="text-sm font-semibold text-[#999] mb-2 block">Nome do Setor *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-white"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                  placeholder="Ex: Atendimento, Vendas, Suporte"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#999] mb-2 block">Cor</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-12 h-10 rounded-lg cursor-pointer border"
                    style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                  />
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="flex-1 px-4 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-white text-sm"
                    style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-[#999] mb-2 block">Mensagem de Saudação</label>
                <textarea
                  value={formData.greetingMessage}
                  onChange={(e) => setFormData({ ...formData, greetingMessage: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-white resize-none"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                  rows={3}
                  placeholder="Mensagem que será exibida para contatos deste setor"
                />
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
