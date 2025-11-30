import React, { useState } from 'react'
import { MoreVertical, MessageSquare, Edit2, Trash2, Activity, FunnelIcon, Eye, ChevronDown } from 'lucide-react'
import { useCRM } from '@/context/CRMContext'
import { cn } from '@/lib/utils'
import { useContactSidebar } from '@/hooks/useContactSidebar'
import ContactActionMenu from '@/components/ContactActionMenu'

export default function ContactListingTable() {
  const { filteredCustomers, sectors, users } = useCRM()
  const { openSidebar } = useContactSidebar()
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  const handleSelectAll = () => {
    if (selectedContacts.length === filteredCustomers.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(filteredCustomers.map(c => c.id))
    }
  }

  const handleSelectContact = (contactId: string) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter(id => id !== contactId))
    } else {
      setSelectedContacts([...selectedContacts, contactId])
    }
  }

  const stageLabels: Record<string, string> = {
    'new': 'Novo',
    'attending': 'Em atendimento',
    'waiting': 'Aguardando',
    'completed': 'Concluído'
  }

  const stageColors: Record<string, string> = {
    'new': '#00FF9A',
    'attending': '#00D4FF',
    'waiting': '#FFB800',
    'completed': '#50E991'
  }

  if (filteredCustomers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#666] mb-2">Nenhum contato encontrado</p>
        <p className="text-[#999] text-sm">Ajuste seus filtros e tente novamente</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="text-sm text-[#999]">
        {selectedContacts.length > 0 && (
          <span className="text-[#00FF9A] font-semibold">{selectedContacts.length} selecionado{selectedContacts.length !== 1 ? 's' : ''}</span>
        )}
        {filteredCustomers.length > 0 && (
          <span className="ml-2 text-[#666]">· {filteredCustomers.length} contato{filteredCustomers.length !== 1 ? 's' : ''}</span>
        )}
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'rgba(0,255,154,0.1)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Header */}
            <thead>
              <tr className="border-b" style={{ borderColor: 'rgba(0,255,154,0.1)' }}>
                <th className="px-4 py-3 text-left w-12">
                  <input
                    type="checkbox"
                    checked={selectedContacts.length === filteredCustomers.length && filteredCustomers.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 text-left text-[#999] font-semibold">Nome</th>
                <th className="px-4 py-3 text-left text-[#999] font-semibold">Telefone</th>
                <th className="px-4 py-3 text-left text-[#999] font-semibold">Setor</th>
                <th className="px-4 py-3 text-left text-[#999] font-semibold">Atendente</th>
                <th className="px-4 py-3 text-left text-[#999] font-semibold">Etapa</th>
                <th className="px-4 py-3 text-left text-[#999] font-semibold">Tags</th>
                <th className="px-4 py-3 text-left text-[#999] font-semibold">Última Mensagem</th>
                <th className="px-4 py-3 text-right text-[#999] font-semibold">Ações</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {filteredCustomers.map((customer) => {
                const isSelected = selectedContacts.includes(customer.id)
                const isExpanded = expandedCustomer === customer.id

                return (
                  <React.Fragment key={customer.id}>
                    <tr className="border-b hover:bg-[#0F0F0F]/50 transition-colors" style={{ borderColor: 'rgba(0,255,154,0.06)' }}>
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectContact(customer.id)}
                          className="w-4 h-4 rounded cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={customer.avatar} alt={customer.name} className="h-8 w-8 rounded-full" />
                          <div>
                            <div className="font-medium text-white">{customer.name}</div>
                            <div className="text-xs text-[#666]">{customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#999]">{customer.phone}</td>
                      <td className="px-4 py-3">
                        {customer.sector ? (
                          <span
                            className="px-2 py-1 rounded text-xs font-semibold"
                            style={{
                              backgroundColor: sectors.find(s => s.id === customer.sector)?.color + '20',
                              color: sectors.find(s => s.id === customer.sector)?.color || '#999'
                            }}
                          >
                            {sectors.find(s => s.id === customer.sector)?.name}
                          </span>
                        ) : (
                          <span className="text-[#666]">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {customer.assignedTo ? (
                          <span className="text-[#999] text-xs">
                            {users.find(u => u.id === customer.assignedTo)?.name}
                          </span>
                        ) : (
                          <span className="text-[#666]">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="px-2 py-1 rounded text-xs font-semibold"
                          style={{ backgroundColor: stageColors[customer.stage] + '20', color: stageColors[customer.stage] }}
                        >
                          {stageLabels[customer.stage]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {customer.tags.length > 0 ? (
                            customer.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="px-2 py-0.5 rounded text-xs bg-[#00FF9A]/10 text-[#00FF9A]">
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-[#666]">-</span>
                          )}
                          {customer.tags.length > 2 && (
                            <span className="px-2 py-0.5 rounded text-xs text-[#666]">
                              +{customer.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#999]">
                        <div className="line-clamp-1 text-xs">{customer.lastMessage}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setExpandedCustomer(isExpanded ? null : customer.id)}
                            className="p-1.5 hover:bg-[#1A1A1A] rounded transition-colors"
                          >
                            <ChevronDown className={cn('h-4 w-4 text-[#666] transition-transform', isExpanded && 'rotate-180')} />
                          </button>
                          <button
                            onClick={() => openSidebar(customer.id)}
                            className="p-1.5 hover:bg-[#1A1A1A] rounded transition-colors"
                            title="Ver detalhes"
                          >
                            <Eye className="h-4 w-4 text-[#00FF9A]" />
                          </button>
                          <div className="relative">
                            <button
                              onClick={() => setOpenMenuId(openMenuId === customer.id ? null : customer.id)}
                              className="p-1.5 hover:bg-[#1A1A1A] rounded transition-colors"
                            >
                              <MoreVertical className="h-4 w-4 text-[#666]" />
                            </button>
                            {openMenuId === customer.id && (
                              <ContactActionMenu customer={customer} onClose={() => setOpenMenuId(null)} />
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Row */}
                    {isExpanded && (
                      <tr style={{ borderColor: 'rgba(0,255,154,0.06)' }} className="border-b bg-[#0F0F0F]/50">
                        <td colSpan={9} className="px-4 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            {/* Left Column */}
                            <div className="space-y-3">
                              <div>
                                <div className="text-xs text-[#666] mb-1">Email</div>
                                <div className="text-white">{customer.email || '-'}</div>
                              </div>
                              <div>
                                <div className="text-xs text-[#666] mb-1">Criado em</div>
                                <div className="text-white">{new Date(customer.createdAt).toLocaleDateString('pt-BR')}</div>
                              </div>
                              <div>
                                <div className="text-xs text-[#666] mb-1">Origem</div>
                                <div className="text-white">{customer.origin || '-'}</div>
                              </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-3">
                              <div>
                                <div className="text-xs text-[#666] mb-1">Status</div>
                                <div className="text-white flex items-center gap-2">
                                  <div className={cn('w-2 h-2 rounded-full', customer.online ? 'bg-[#00FF9A]' : 'bg-[#666]')} />
                                  {customer.online ? 'Online' : 'Offline'}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-[#666] mb-1">Última mensagem</div>
                                <div className="text-[#999] text-xs">{new Date(customer.lastMessageAt).toLocaleString('pt-BR')}</div>
                              </div>
                              {customer.tasks.length > 0 && (
                                <div>
                                  <div className="text-xs text-[#666] mb-1">Tarefas</div>
                                  <div className="text-white text-sm font-semibold">{customer.tasks.filter(t => !t.completed).length} pendente{customer.tasks.filter(t => !t.completed).length !== 1 ? 's' : ''}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
