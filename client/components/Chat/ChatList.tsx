import React, { useMemo } from 'react'
import { Search, MessageCircle } from 'lucide-react'
import { useCRM } from '@/context/CRMContext'

interface ChatListProps {
  selectedContactId: string | null
  onSelectContact: (contactId: string) => void
  searchTerm: string
  onSearchChange: (term: string) => void
}

const getTimeAgo = (dateString: string) => {
  const now = new Date()
  const past = new Date(dateString)
  const diffMs = now.getTime() - past.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Agora'
  if (diffMins < 60) return `${diffMins}m`
  if (diffHours < 24) return `${diffHours}h`
  if (diffDays < 7) return `${diffDays}d`
  return past.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })
}

export default function ChatList({
  selectedContactId,
  onSelectContact,
  searchTerm,
  onSearchChange
}: ChatListProps) {
  const { customers } = useCRM()

  const filteredContacts = useMemo(() => {
    return customers.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
    ).sort((a, b) => {
      const aTime = new Date(a.lastMessageAt).getTime()
      const bTime = new Date(b.lastMessageAt).getTime()
      return bTime - aTime
    })
  }, [customers, searchTerm])

  return (
    <div className="flex flex-col h-full bg-[#0F0F0F] border-r border-[rgba(0,255,154,0.1)]">
      {/* Header */}
      <div className="flex-shrink-0 p-4 space-y-4 border-b border-[rgba(0,255,154,0.1)]">
        <h1 className="text-2xl font-bold text-white">Mensagens</h1>
        
        {/* Search bar */}
        <div className="flex items-center gap-2 bg-[#1A1A1A] rounded-lg px-3 py-2 border border-[rgba(255,255,255,0.06)]">
          <Search className="h-4 w-4 text-[#666]" />
          <input
            type="text"
            placeholder="Buscar conversas..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent outline-none text-sm flex-1 text-white placeholder:text-[#666]"
          />
        </div>
      </div>

      {/* Contact list */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-[#666] p-4">
            <MessageCircle className="h-12 w-12 mb-3 opacity-30" />
            <p className="text-sm">Nenhuma conversa encontrada</p>
          </div>
        ) : (
          <div className="divide-y divide-[rgba(255,255,255,0.03)]">
            {filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => onSelectContact(contact.id)}
                className={`w-full text-left p-4 transition-all hover:bg-[#1A1A1A] ${
                  selectedContactId === contact.id
                    ? 'bg-[rgba(0,255,154,0.1)] border-l-2 border-[#00FF9A]'
                    : ''
                }`}
              >
                <div className="flex gap-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#00FF9A] border-2 border-[#0F0F0F]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-white truncate">{contact.name}</h3>
                      <span className="text-xs text-[#666] flex-shrink-0">
                        {getTimeAgo(contact.lastMessageAt)}
                      </span>
                    </div>
                    <p className="text-sm text-[#999] line-clamp-2">
                      {contact.lastMessage}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
