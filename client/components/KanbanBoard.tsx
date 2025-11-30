import React, { useState, useEffect } from 'react'
import { Settings, X, Search, CheckCircle2, Trash2, Edit2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCRM } from '@/context/CRMContext'
import { useContactSidebar } from '@/hooks/useContactSidebar'
import { mockData } from '@/mocks/premium-mock-data'
import CRMFilters from './CRMFilters'

const DEFAULT_COLUMNS = [
  { id: 'novo', title: 'Novos Leads', color: '#3B82F6' },
  { id: 'em_atendimento', title: 'Em Atendimento', color: '#F59E0B' },
  { id: 'negociacao', title: 'Negociação', color: '#A855F7' },
  { id: 'pos_venda', title: 'Pós-venda', color: '#10B981' }
]

const TAG_COLORS: Record<string, string> = {
  'SUPORTE': '#10B981',
  'PRIORIDADE': '#EF4444',
  'LEAD_QUENTE': '#F59E0B',
  'VIP': '#A855F7',
  'IMPLANTACAO': '#06B6D4',
  'RENOVACAO': '#8B5CF6',
  'AGENDADO': '#3B82F6',
  'LEAD_FRIO': '#6B7280',
}

interface KanbanBoardProps {
  showHeader?: boolean
}

export default function KanbanBoard({ showHeader = true }: KanbanBoardProps) {
  const {
    customers,
    filteredCustomers,
    selectedCustomerId,
    selectCustomer,
    moveToStage,
    filters,
    setFilters
  } = useCRM()
  const { openContactSidebar } = useContactSidebar()

  const [showConfigModal, setShowConfigModal] = useState(false)
  const [draggedCard, setDraggedCard] = useState<string | null>(null)
  const [columnConfigs, setColumnConfigs] = useState(DEFAULT_COLUMNS)
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null)
  const [editingColumnTitle, setEditingColumnTitle] = useState('')
  const [editingColumnColor, setEditingColumnColor] = useState('')

  const handleDragStart = (e: React.DragEvent, customerId: string) => {
    setDraggedCard(customerId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDropOnColumn = (stageId: string) => {
    if (draggedCard) {
      moveToStage(draggedCard, stageId as any)
      setDraggedCard(null)
    }
  }

  const handleStartEditColumn = (columnId: string, currentTitle: string, currentColor: string) => {
    setEditingColumnId(columnId)
    setEditingColumnTitle(currentTitle)
    setEditingColumnColor(currentColor)
  }

  const handleSaveColumnEdit = () => {
    if (!editingColumnId) return
    setColumnConfigs(prevConfigs =>
      prevConfigs.map(config =>
        config.id === editingColumnId
          ? { ...config, title: editingColumnTitle, color: editingColumnColor }
          : config
      )
    )
    setEditingColumnId(null)
  }

  const handleResetColumns = () => {
    setColumnConfigs(DEFAULT_COLUMNS)
    setShowConfigModal(false)
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const past = new Date(dateString)
    const diffMs = now.getTime() - past.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Agora'
    if (diffMins < 60) return `há ${diffMins}m`
    if (diffHours < 24) return `há ${diffHours}h`
    return `há ${diffDays}d`
  }

  // Use mock data for display
  const displayContacts = mockData.contacts

  return (
    <>
      {showHeader && (
        <div className="sticky top-0 z-40 border-b border-[#1a1a2e] bg-[#0f0f1e]/80 backdrop-blur-sm">
          <div className="px-4 md:px-6 py-4">
            <div className="flex gap-3 items-center mb-4">
              <div className="flex-1 flex items-center gap-2 bg-[#1a1a2e] rounded-lg border border-[#2a2a3e] px-3 py-2">
                <Search className="h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Buscar contato..."
                  value={filters.search}
                  onChange={(e) => setFilters({ search: e.target.value })}
                  className="bg-transparent outline-none text-sm flex-1 text-white"
                />
              </div>
              <button
                onClick={() => setShowConfigModal(true)}
                className="px-4 py-2 rounded-lg border border-[#1a1a2e] transition-all hover:border-[#00FF84]/50 hover:bg-white/5 flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                <span className="text-sm font-medium hidden sm:inline">Etapas</span>
              </button>
            </div>
            <CRMFilters showAdvanced={true} />
          </div>
        </div>
      )}

      {/* Kanban Board */}
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-full p-4 md:p-6 w-full bg-[#0a0a0a]">
          {columnConfigs.map((column) => {
            const columnContacts = displayContacts.filter(c => c.stage === column.id)

            return (
              <div
                key={column.id}
                className="flex flex-col rounded-2xl border border-[#1a1a2e] h-[calc(100vh-220px)] sm:h-[calc(100vh-200px)] min-w-0 overflow-hidden hover:border-opacity-75 transition-colors"
                style={{
                  backgroundColor: '#0f0f1e',
                }}
                onDragOver={handleDragOver}
                onDrop={() => handleDropOnColumn(column.id)}
              >
                {/* Column Header */}
                <div
                  className="px-4 py-3 border-b border-[#1a1a2e] flex items-center justify-between sticky top-0 z-10"
                  style={{
                    backgroundColor: `${column.color}08`,
                  }}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: column.color }}
                    />
                    <h3 className="font-semibold text-sm truncate">{column.title}</h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#1a1a2e] font-semibold" style={{ color: column.color }}>
                    {columnContacts.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {columnContacts.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-center text-gray-500 text-sm">
                      Nenhum contato
                    </div>
                  ) : (
                    columnContacts.map((contact) => (
                      <div
                        key={contact.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, contact.id)}
                        onClick={() => openContactSidebar(contact)}
                        className="p-3 rounded-lg border border-[#1a1a2e] cursor-move transition-all hover:border-opacity-50 hover:shadow-lg hover:bg-[#1a1a2e]/50 bg-[#0f0f1e] group"
                        style={{
                          borderColor: `${column.color}40`,
                        }}
                      >
                        <div className="flex gap-2 mb-2">
                          <span className="text-2xl flex-shrink-0">{contact.avatar}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm truncate text-white">{contact.name}</div>
                            <div className="text-xs text-gray-500 truncate">{contact.phone}</div>
                            <div className="text-xs text-gray-400 mt-1">R$ {contact.value.toLocaleString('pt-BR')}</div>
                          </div>
                        </div>

                        {/* Tags */}
                        {contact.tags && contact.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {contact.tags.slice(0, 2).map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-0.5 rounded-full font-semibold"
                                style={{
                                  backgroundColor: `${TAG_COLORS[tag] || '#6B7280'}30`,
                                  color: TAG_COLORS[tag] || '#9CA3AF'
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                            {contact.tags && contact.tags.length > 2 && (
                              <span className="text-xs px-2 py-0.5 rounded-full text-gray-500">
                                +{contact.tags.length - 2}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Last activity */}
                        <div className="text-xs text-gray-500 line-clamp-2 mb-2">{contact.lastActivity || 'Sem atividade recente'}</div>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>{getTimeAgo(contact.createdAt)}</span>
                          <span>📞</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Config Etapas Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
          <div
            className="bg-[#0f0f1e] rounded-2xl border border-[#1a1a2e] w-full md:w-[500px] md:max-h-[80vh] overflow-y-auto"
          >
            <div className="sticky top-0 p-4 border-b border-[#1a1a2e] flex items-center justify-between bg-[#0f0f1e]">
              <h3 className="font-semibold">Configurar Etapas</h3>
              <button
                onClick={() => setShowConfigModal(false)}
                className="p-1 hover:bg-[#1a1a2e] rounded transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {editingColumnId ? (
                <div className="space-y-4 p-3 rounded-lg border border-[#1a1a2e]">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wide block mb-2">Nome da Etapa</label>
                    <input
                      type="text"
                      value={editingColumnTitle}
                      onChange={(e) => setEditingColumnTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] text-white outline-none focus:border-[#00FF84] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wide block mb-2">Cor</label>
                    <div className="flex gap-2 flex-wrap">
                      {['#00FF95', '#3B82F6', '#F59E0B', '#A855F7', '#EF4444', '#06B6D4', '#10B981'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setEditingColumnColor(color)}
                          className={cn(
                            'h-10 w-10 rounded-lg transition-all border-2',
                            editingColumnColor === color ? 'border-white' : 'border-transparent'
                          )}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveColumnEdit}
                      className="flex-1 px-4 py-2 rounded-lg font-semibold text-black transition-all hover:shadow-lg"
                      style={{ backgroundColor: '#00FF84' }}
                    >
                      Salvar
                    </button>
                    <button
                      onClick={() => setEditingColumnId(null)}
                      className="flex-1 px-4 py-2 rounded-lg border border-[#1a1a2e] transition-colors hover:bg-[#1a1a2e]"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {columnConfigs.map((config) => (
                    <div
                      key={config.id}
                      className="p-3 rounded-lg border border-[#1a1a2e] flex items-center justify-between hover:bg-[#1a1a2e]/50 transition-colors cursor-pointer"
                      onClick={() => handleStartEditColumn(config.id, config.title, config.color)}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className="h-4 w-4 rounded-full"
                          style={{ backgroundColor: config.color }}
                        />
                        <span className="font-medium text-sm">{config.title}</span>
                      </div>
                      <Edit2 className="h-4 w-4 text-gray-500" />
                    </div>
                  ))}
                </div>
              )}

              {!editingColumnId && (
                <div className="pt-4 border-t border-[#1a1a2e]">
                  <button
                    onClick={handleResetColumns}
                    className="w-full px-4 py-2 rounded-lg border border-[#1a1a2e] transition-all hover:bg-[#1a1a2e] text-sm font-medium"
                  >
                    Resetar Configuração
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
