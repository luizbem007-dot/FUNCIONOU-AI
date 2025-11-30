import React, { useState } from 'react'
import { Building } from 'lucide-react'
import { MOCK_SECTORS } from '@/mocks/sectors.mock'
import PagePlaceholder from '@/components/PagePlaceholder'
import Modal from '@/components/Modal'
import { cn } from '@/lib/utils'

export default function SetoresPage() {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    color: '#00FF9A',
    greetingMessage: ''
  })

  const handleAddSector = () => {
    setShowModal(true)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    console.log('Add sector:', formData)
    setShowModal(false)
    setFormData({ name: '', color: '#00FF9A', greetingMessage: '' })
  }

  return (
    <div className="min-h-screen bg-[#070707]">
      <PagePlaceholder
        title="Setores"
        description="Gerencie os setores de atendimento"
        icon="🏢"
        actions={[
          {
            label: '+ ADICIONAR SETOR',
            onClick: handleAddSector,
            variant: 'primary'
          }
        ]}
      >
        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_SECTORS.map((sector) => (
            <div
              key={sector.id}
              className="p-6 rounded-lg border border-[#00FF9A]/20 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: sector.color }}
                />
                <h3 className="text-lg font-bold text-white">{sector.name}</h3>
              </div>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {sector.greetingMessage}
              </p>

              <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                <span>{sector.userCount} usuários</span>
                <span>Criado em {sector.createdAt}</span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-2 py-2 text-xs rounded bg-[#00FF9A]/20 text-[#00FF9A] hover:bg-[#00FF9A]/30 transition-colors">
                  Editar
                </button>
                <button className="flex-1 px-2 py-2 text-xs rounded bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors">
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      </PagePlaceholder>

      {/* Modal para adicionar setor */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-6">Adicionar Novo Setor</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nome do Setor</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Ex: Atendimento, Vendas..."
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#00FF9A]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF9A]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Cor</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleFormChange}
                    className="h-10 w-20 rounded-lg cursor-pointer"
                  />
                  <span className="text-gray-400 text-sm flex items-center">{formData.color}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Mensagem de Saudação</label>
                <textarea
                  name="greetingMessage"
                  value={formData.greetingMessage}
                  onChange={handleFormChange}
                  placeholder="Digite a mensagem de saudação"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#00FF9A]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF9A]"
                />
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
