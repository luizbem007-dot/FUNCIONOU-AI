import React, { useState } from 'react'
import { Tag, Plus, Trash2 } from 'lucide-react'
import PagePlaceholder from '@/components/PagePlaceholder'
import Modal from '@/components/Modal'

interface TagData {
  id: string
  name: string
  color: string
  count: number
  description: string
}

const MOCK_TAGS: TagData[] = [
  {
    id: 't1',
    name: 'Novo',
    color: '#3B82F6',
    count: 124,
    description: 'Contatos que acabaram de chegar'
  },
  {
    id: 't2',
    name: 'Quente',
    color: '#F97316',
    count: 87,
    description: 'Leads com alta probabilidade de conversão'
  },
  {
    id: 't3',
    name: 'Frio',
    color: '#64748B',
    count: 234,
    description: 'Contatos inativos'
  },
  {
    id: 't4',
    name: 'VIP',
    color: '#FFD700',
    count: 12,
    description: 'Clientes premium'
  },
  {
    id: 't5',
    name: 'Respondido',
    color: '#10B981',
    count: 156,
    description: 'Contatos que já receberam resposta'
  },
  {
    id: 't6',
    name: 'Aguardando',
    color: '#FBBF24',
    count: 45,
    description: 'Aguardando ação do cliente'
  }
]

export default function TagsPage() {
  const [tags, setTags] = useState(MOCK_TAGS)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    color: '#00FF9A',
    description: ''
  })

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddTag = () => {
    if (formData.name.trim()) {
      const newTag: TagData = {
        id: `t${tags.length + 1}`,
        name: formData.name,
        color: formData.color,
        count: 0,
        description: formData.description
      }
      setTags([...tags, newTag])
      setShowModal(false)
      setFormData({ name: '', color: '#00FF9A', description: '' })
    }
  }

  const handleDeleteTag = (id: string) => {
    setTags(tags.filter(tag => tag.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#070707]">
      <PagePlaceholder
        title="Tags"
        description="Organize seus contatos com tags"
        icon="🏷️"
        actions={[
          {
            label: '+ NOVA TAG',
            onClick: () => setShowModal(true),
            variant: 'primary'
          }
        ]}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="p-6 rounded-lg border border-[#00FF9A]/20 bg-white/5 hover:bg-white/10 transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-5 h-5 rounded flex-shrink-0"
                  style={{ backgroundColor: tag.color }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{tag.name}</h3>
                  <p className="text-xs text-gray-500">{tag.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4 py-3 border-t border-b border-[#00FF9A]/20">
                <span className="text-2xl font-bold text-white">{tag.count}</span>
                <span className="text-xs text-gray-400">contatos</span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 text-sm rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-medium">
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteTag(tag.id)}
                  className="px-4 py-2 text-sm rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tag Usage Stats */}
        <div className="mt-8 p-6 rounded-lg border border-[#00FF9A]/20 bg-white/5">
          <h3 className="text-lg font-semibold text-white mb-4">Estatísticas de Uso</h3>

          <div className="space-y-3">
            {tags.slice(0, 5).map((tag) => (
              <div key={tag.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">{tag.name}</span>
                  <span className="text-sm font-semibold text-white">{tag.count} contatos</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full"
                    style={{
                      backgroundColor: tag.color,
                      width: `${(tag.count / 234) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </PagePlaceholder>

      {/* Modal para adicionar tag */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-6">Criar Nova Tag</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nome da Tag</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Ex: VIP, Quente, Frio..."
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Digite uma descrição para a tag"
                  rows={3}
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
                onClick={handleAddTag}
                className="flex-1 px-4 py-2 rounded-lg bg-[#00FF9A] text-black hover:bg-[#00FF9A]/80 transition-colors font-medium"
              >
                Criar Tag
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
