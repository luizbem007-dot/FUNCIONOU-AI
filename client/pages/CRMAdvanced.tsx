import React, { useState, useMemo } from 'react'
import { Search, Filter, Download, Upload, Settings, X, Plus, ChevronDown } from 'lucide-react'
import { useCRM } from '@/context/CRMContext'
import { cn } from '@/lib/utils'
import ContactListingTable from '@/components/ContactListingTable'
import CRMFiltersPanel from '@/components/CRMFiltersPanel'
import ContactModal from '@/components/ContactModal'

export default function CRMAdvanced() {
  const { filters, setFilters, clearFilters, customers, sectors, users } = useCRM()
  const [showFilters, setShowFilters] = useState(false)
  const [showAddContact, setShowAddContact] = useState(false)
  const [searchQuery, setSearchQuery] = useState(filters.search)

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setFilters({ search: value })
  }

  const hasActiveFilters = useMemo(() => {
    return Boolean(
      filters.stage ||
      filters.tag ||
      filters.status ||
      filters.sector ||
      filters.assignedTo ||
      filters.dateFrom ||
      filters.dateTo
    )
  }, [filters])

  const handleExport = () => {
    const csv = [
      ['Nome', 'Telefone', 'Email', 'Etapa', 'Tags', 'Setor', 'Atribuído a', 'Criado em'].join(','),
      ...customers.map(c => [
        c.name,
        c.phone,
        c.email || '',
        c.stage,
        c.tags.join(';'),
        sectors.find(s => s.id === c.sector)?.name || '',
        users.find(u => u.id === c.assignedTo)?.name || '',
        new Date(c.createdAt).toLocaleDateString('pt-BR')
      ].map(field => `"${field}"`).join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `contatos-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b p-6" style={{ borderColor: 'rgba(0,255,154,0.06)' }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">CRM Avançado</h1>
          <p className="text-[#999]">Gerencie seus contatos e processos de vendas</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="border-b p-4 md:p-6 bg-black/50" style={{ borderColor: 'rgba(0,255,154,0.06)' }}>
        <div className="max-w-7xl mx-auto">
          {/* Search and Action Buttons */}
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
              <input
                type="text"
                placeholder="Buscar por nome ou telefone…"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#0F0F0F] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-sm text-white placeholder-[#666]"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              />
            </div>

            {/* Action Buttons */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'px-4 py-2 rounded-lg border font-semibold text-sm transition-all flex items-center gap-2 whitespace-nowrap',
                hasActiveFilters ? 'border-[#00FF9A] bg-[#00FF9A]/10 text-[#00FF9A]' : 'border-[#666] hover:bg-[#1A1A1A]'
              )}
              style={{ borderColor: hasActiveFilters ? '#00FF9A' : 'rgba(255,255,255,0.1)' }}
            >
              <Filter className="h-4 w-4" />
              Filtros {hasActiveFilters && <span className="text-xs bg-[#00FF9A]/20 px-2 py-0.5 rounded-full">Ativo</span>}
            </button>

            <button
              onClick={() => setShowAddContact(true)}
              className="px-4 py-2 rounded-lg border font-semibold text-sm transition-all flex items-center gap-2 whitespace-nowrap hover:bg-[#1A1A1A]"
              style={{ borderColor: 'rgba(0,255,154,0.2)' }}
            >
              <Plus className="h-4 w-4" />
              Adicionar
            </button>

            <button
              onClick={handleExport}
              className="px-4 py-2 rounded-lg border font-semibold text-sm transition-all flex items-center gap-2 whitespace-nowrap hover:bg-[#1A1A1A]"
              style={{ borderColor: 'rgba(0,255,154,0.2)' }}
            >
              <Download className="h-4 w-4" />
              Exportar
            </button>

            <button
              onClick={() => document.getElementById('csv-upload')?.click()}
              className="px-4 py-2 rounded-lg border font-semibold text-sm transition-all flex items-center gap-2 whitespace-nowrap hover:bg-[#1A1A1A]"
              style={{ borderColor: 'rgba(0,255,154,0.2)' }}
            >
              <Upload className="h-4 w-4" />
              Importar
            </button>
            <input type="file" id="csv-upload" accept=".csv" className="hidden" />

            <button
              onClick={() => window.open('/admin', '_blank')}
              className="px-4 py-2 rounded-lg border font-semibold text-sm transition-all flex items-center gap-2 whitespace-nowrap hover:bg-[#1A1A1A]"
              style={{ borderColor: 'rgba(0,255,154,0.2)' }}
            >
              <Settings className="h-4 w-4" />
              Config
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4">
              <CRMFiltersPanel onClose={() => setShowFilters(false)} />
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    clearFilters()
                    setSearchQuery('')
                  }}
                  className="mt-4 px-4 py-2 rounded-lg border text-sm transition-colors hover:bg-red-500/10 text-red-500"
                  style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                >
                  Limpar Filtros
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <ContactListingTable />
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <ContactModal onClose={() => setShowAddContact(false)} />
      )}
    </div>
  )
}
