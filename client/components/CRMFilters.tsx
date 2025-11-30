import React from 'react'
import { Search, Filter, X } from 'lucide-react'
import { useCRM } from '@/context/CRMContext'
import { cn } from '@/lib/utils'

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  novo: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
  quente: { bg: 'bg-red-500/20', text: 'text-red-400' },
  frio: { bg: 'bg-cyan-500/20', text: 'text-cyan-400' },
  aguardando: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
  respondido: { bg: 'bg-green-500/20', text: 'text-green-400' },
  vip: { bg: 'bg-purple-500/20', text: 'text-purple-400' }
}

interface CRMFiltersProps {
  showAdvanced?: boolean
}

export default function CRMFilters({ showAdvanced = true }: CRMFiltersProps) {
  const { filters, setFilters, clearFilters, availableTags } = useCRM()

  const stageOptions = [
    { value: 'new', label: 'Novos contatos' },
    { value: 'attending', label: 'Em atendimento' },
    { value: 'waiting', label: 'Aguardando retorno' },
    { value: 'completed', label: 'Concluído' }
  ]

  const hasActiveFilters = filters.stage || filters.tag || filters.status || filters.search || filters.dateFrom || filters.dateTo

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-[#0F0F0F] rounded-lg border px-3 py-2" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <Search className="h-4 w-4 text-[#666]" />
        <input
          type="text"
          placeholder="Buscar por nome ou telefone..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="bg-transparent outline-none text-sm flex-1 w-full"
        />
      </div>

      {showAdvanced && (
        <div className="grid grid-cols-2 gap-2">
          {/* Stage Filter */}
          <select
            value={filters.stage || ''}
            onChange={(e) => setFilters({ stage: e.target.value || null })}
            className="px-3 py-2 rounded-lg bg-[#0F0F0F] border text-sm outline-none focus:border-[#00FF9A] transition-colors text-white"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <option value="">Todos - Etapas</option>
            {stageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filters.status || ''}
            onChange={(e) => setFilters({ status: e.target.value || null })}
            className="px-3 py-2 rounded-lg bg-[#0F0F0F] border text-sm outline-none focus:border-[#00FF9A] transition-colors text-white"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <option value="">Todos - Status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      )}

      {/* Tags Filter */}
      {showAdvanced && (
        <div>
          <label className="text-xs text-[#666] uppercase tracking-wide block mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const isSelected = filters.tag === tag
              const colors = TAG_COLORS[tag]
              return (
                <button
                  key={tag}
                  onClick={() => setFilters({ tag: isSelected ? null : tag })}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-semibold transition-all border',
                    isSelected
                      ? `${colors.bg} ${colors.text} border-current`
                      : 'bg-[#1A1A1A] text-[#666] border-[rgba(255,255,255,0.1)]'
                  )}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Date Range Filter */}
      {showAdvanced && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-[#666] uppercase tracking-wide block mb-1">De</label>
            <input
              type="date"
              value={filters.dateFrom || ''}
              onChange={(e) => setFilters({ dateFrom: e.target.value || null })}
              className="w-full px-3 py-2 rounded-lg bg-[#0F0F0F] border text-sm outline-none focus:border-[#00FF9A] transition-colors text-white"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            />
          </div>
          <div>
            <label className="text-xs text-[#666] uppercase tracking-wide block mb-1">Até</label>
            <input
              type="date"
              value={filters.dateTo || ''}
              onChange={(e) => setFilters({ dateTo: e.target.value || null })}
              className="w-full px-3 py-2 rounded-lg bg-[#0F0F0F] border text-sm outline-none focus:border-[#00FF9A] transition-colors text-white"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            />
          </div>
        </div>
      )}

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full px-3 py-2 rounded-lg border text-sm transition-colors hover:bg-[#1A1A1A] flex items-center justify-center gap-2"
          style={{ borderColor: 'rgba(0,255,154,0.2)' }}
        >
          <X className="h-4 w-4" />
          Limpar Filtros
        </button>
      )}
    </div>
  )
}
