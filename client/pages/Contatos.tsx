import React, { useState } from 'react'
import { Users, Trash2, Edit, MessageSquare } from 'lucide-react'
import { MOCK_CONTACTS } from '@/mocks/contacts.mock'
import PagePlaceholder from '@/components/PagePlaceholder'
import { cn } from '@/lib/utils'

const statusColors: Record<string, string> = {
  novo: 'bg-blue-500/20 text-blue-300',
  'em-atendimento': 'bg-yellow-500/20 text-yellow-300',
  pendente: 'bg-gray-500/20 text-gray-300',
  convertido: 'bg-green-500/20 text-green-300'
}

const statusLabels: Record<string, string> = {
  novo: 'Novo',
  'em-atendimento': 'Em Atendimento',
  pendente: 'Pendente',
  convertido: 'Convertido'
}

export default function ContatosPage() {
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set())

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedContacts(new Set(MOCK_CONTACTS.map(c => c.id)))
    } else {
      setSelectedContacts(new Set())
    }
  }

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedContacts)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setSelectedContacts(newSet)
  }

  return (
    <div className="min-h-screen bg-[#070707]">
      <PagePlaceholder
        title="Contatos"
        description="Gerencie sua base de contatos"
        icon="👥"
        actions={[
          {
            label: '+ NOVO CONTATO',
            onClick: () => console.log('Add contact'),
            variant: 'primary'
          }
        ]}
      >
        {/* Contacts Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#00FF9A]/20 sticky top-0 bg-[#0b0b0b]">
              <tr className="text-gray-400 text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-4 font-semibold">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={selectedContacts.size === MOCK_CONTACTS.length && MOCK_CONTACTS.length > 0}
                    className="w-4 h-4 cursor-pointer"
                  />
                </th>
                <th className="text-left px-6 py-4 font-semibold">Nome</th>
                <th className="text-left px-6 py-4 font-semibold">Telefone</th>
                <th className="text-left px-6 py-4 font-semibold">Email</th>
                <th className="text-left px-6 py-4 font-semibold">Tags</th>
                <th className="text-left px-6 py-4 font-semibold">Status</th>
                <th className="text-left px-6 py-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#00FF9A]/10">
              {MOCK_CONTACTS.map((contact) => (
                <tr
                  key={contact.id}
                  className="hover:bg-white/5 transition-colors border-b border-[#00FF9A]/10"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedContacts.has(contact.id)}
                      onChange={() => toggleSelect(contact.id)}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF9A] to-[#00FF9A]/40" />
                      <span className="text-white font-medium">{contact.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{contact.phone}</td>
                  <td className="px-6 py-4 text-gray-400">{contact.email || '-'}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {contact.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded text-xs bg-[#00FF9A]/20 text-[#00FF9A] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn('px-2 py-1 rounded text-xs font-medium', statusColors[contact.status])}>
                      {statusLabels[contact.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-white/10 rounded transition-colors" title="Conversa">
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded transition-colors" title="Editar">
                        <Edit className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded transition-colors" title="Deletar">
                        <Trash2 className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedContacts.size > 0 && (
          <div className="fixed bottom-4 left-4 right-4 bg-[#1a1a1a] border border-[#00FF9A]/20 rounded-lg p-4 flex items-center justify-between">
            <span className="text-sm text-gray-300">
              {selectedContacts.size} contato(s) selecionado(s)
            </span>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                Exportar
              </button>
              <button className="px-4 py-2 text-sm rounded-lg bg-[#00FF9A] text-black hover:bg-[#00FF9A]/80 transition-colors font-medium">
                Enviar Disparo
              </button>
            </div>
          </div>
        )}
      </PagePlaceholder>
    </div>
  )
}
