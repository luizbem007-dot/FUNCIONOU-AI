import React from 'react'
import { useCRM } from '@/context/CRMContext'
import { X } from 'lucide-react'

interface CRMFiltersPanelProps {
  onClose: () => void
}

export default function CRMFiltersPanel({ onClose }: CRMFiltersPanelProps) {
  const { filters, setFilters, sectors, users, availableTags } = useCRM()

  const stages = [
    { id: 'new', label: 'Novo' },
    { id: 'attending', label: 'Em atendimento' },
    { id: 'waiting', label: 'Aguardando' },
    { id: 'completed', label: 'Concluído' }
  ]

  const statuses = [
    { id: 'online', label: 'Online' },
    { id: 'offline', label: 'Offline' }
  ]

  return (
    <div className="p-4 rounded-lg border bg-[#0F0F0F]" style={{ borderColor: 'rgba(0,255,154,0.1)' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm text-[#00FF9A]">Filtros Avançados</h3>
        <button onClick={onClose} className="p-1 hover:bg-[#1A1A1A] rounded transition-colors">
          <X className="h-4 w-4 text-[#666]" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stage Filter */}
        <div>
          <label className="text-xs font-semibold text-[#999] mb-2 block">Etapa</label>
          <select
            value={filters.stage || ''}
            onChange={(e) => setFilters({ stage: e.target.value || null })}
            className="w-full px-3 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-sm text-white"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <option value="">Todas as etapas</option>
            {stages.map(stage => (
              <option key={stage.id} value={stage.id}>{stage.label}</option>
            ))}
          </select>
        </div>

        {/* Tag Filter */}
        <div>
          <label className="text-xs font-semibold text-[#999] mb-2 block">Tag</label>
          <select
            value={filters.tag || ''}
            onChange={(e) => setFilters({ tag: e.target.value as any || null })}
            className="w-full px-3 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-sm text-white"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <option value="">Todas as tags</option>
            {availableTags.map(tag => (
              <option key={tag} value={tag}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="text-xs font-semibold text-[#999] mb-2 block">Status</label>
          <select
            value={filters.status || ''}
            onChange={(e) => setFilters({ status: e.target.value || null })}
            className="w-full px-3 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-sm text-white"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <option value="">Todos os status</option>
            {statuses.map(status => (
              <option key={status.id} value={status.id}>{status.label}</option>
            ))}
          </select>
        </div>

        {/* Sector Filter */}
        <div>
          <label className="text-xs font-semibold text-[#999] mb-2 block">Setor</label>
          <select
            value={filters.sector || ''}
            onChange={(e) => setFilters({ sector: e.target.value || null })}
            className="w-full px-3 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-sm text-white"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <option value="">Todos os setores</option>
            {sectors.map(sector => (
              <option key={sector.id} value={sector.id}>{sector.name}</option>
            ))}
          </select>
        </div>

        {/* Assigned To Filter */}
        <div>
          <label className="text-xs font-semibold text-[#999] mb-2 block">Atribuído a</label>
          <select
            value={filters.assignedTo || ''}
            onChange={(e) => setFilters({ assignedTo: e.target.value || null })}
            className="w-full px-3 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-sm text-white"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <option value="">Todos os atendentes</option>
            {users.filter(u => u.role === 'attendant').map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>

        {/* Date From Filter */}
        <div>
          <label className="text-xs font-semibold text-[#999] mb-2 block">De</label>
          <input
            type="date"
            value={filters.dateFrom || ''}
            onChange={(e) => setFilters({ dateFrom: e.target.value || null })}
            className="w-full px-3 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-sm text-white"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          />
        </div>

        {/* Date To Filter */}
        <div>
          <label className="text-xs font-semibold text-[#999] mb-2 block">Até</label>
          <input
            type="date"
            value={filters.dateTo || ''}
            onChange={(e) => setFilters({ dateTo: e.target.value || null })}
            className="w-full px-3 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-sm text-white"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          />
        </div>
      </div>
    </div>
  )
}
