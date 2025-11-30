import React, { useEffect, useRef, useState } from 'react'
import { Send, Phone, Info, Search, MoreVertical, Loader } from 'lucide-react'
import { useCRM } from '@/context/CRMContext'
import { useContactSidebar } from '@/hooks/useContactSidebar'
import MessageBubble from '@/components/MessageBubble'

interface Message {
  id: string
  text: string
  isSent: boolean
  timestamp: string
}

interface ConversationsWindowProps {
  selectedContactId: string | null
  onBack?: () => void
}

const getMessageDate = (timestamp: string) => {
  const date = new Date(timestamp)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const isToday = date.toDateString() === today.toDateString()
  const isYesterday = date.toDateString() === yesterday.toDateString()

  if (isToday) return 'Hoje'
  if (isYesterday) return 'Ontem'
  return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })
}

const groupMessagesByDate = (messages: Message[]) => {
  const groups: Record<string, Message[]> = {}
  
  messages.forEach(msg => {
    const date = getMessageDate(msg.timestamp)
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(msg)
  })

  return Object.entries(groups).map(([date, messages]) => ({ date, messages }))
}

export default function ConversationsWindow({
  selectedContactId,
  onBack
}: ConversationsWindowProps) {
  const { customers } = useCRM()
  const { openContactSidebar } = useContactSidebar()
  const [messages, setMessages] = useState<Message[]>([])
  const [messageInput, setMessageInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const contact = customers.find(c => c.id === selectedContactId)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim() || !contact) return

    const now = new Date()
    const timestamp = now.toISOString()
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text: messageInput.trim(),
      isSent: true,
      timestamp
    }

    setMessages(prev => [...prev, newMessage])
    setMessageInput('')

    // Simulate incoming response
    setLoading(true)
    setTimeout(() => {
      const responseTime = new Date()
      const responseTimeStr = responseTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      
      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}`,
        text: 'Obrigado pela mensagem! Responderei em breve.',
        isSent: false,
        timestamp: responseTime.toISOString()
      }])
      setLoading(false)
    }, 1000)
  }

  if (!contact) {
    return (
      <div className="flex items-center justify-center h-full bg-[#0A0A0A]">
        <div className="text-center text-[#666]">
          <div className="mb-3 text-5xl">💬</div>
          <p className="text-lg font-medium">Selecione uma conversa</p>
          <p className="text-sm mt-1">Escolha um contato para começar</p>
        </div>
      </div>
    )
  }

  const groupedMessages = groupMessagesByDate(messages)

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A]">
      {/* Header */}
      <div className="flex-shrink-0 p-4 bg-[#0F0F0F] border-b border-[rgba(0,255,154,0.1)] flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={onBack}
            className="md:hidden p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors"
            aria-label="Voltar"
          >
            <span className="text-lg">←</span>
          </button>
          
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="h-10 w-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <button
                onClick={() => openContactSidebar(contact)}
                className="block text-left hover:opacity-80 transition-opacity w-full"
              >
                <h2 className="font-semibold text-white truncate">{contact.name}</h2>
                <p className="text-xs text-[#666]">
                  {contact.online ? '🟢 Online' : '⚪ Offline'}
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Header actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors" aria-label="Chamada">
            <Phone className="h-5 w-5 text-[#999]" />
          </button>
          <button
            onClick={() => openContactSidebar(contact)}
            className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors"
            aria-label="Detalhes"
          >
            <Info className="h-5 w-5 text-[#999]" />
          </button>
          <button className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors" aria-label="Mais">
            <MoreVertical className="h-5 w-5 text-[#999]" />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#0A0A0A] via-[#0F0F0F] to-[#0A0A0A]">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-[#666]">
              <div className="mb-3 text-4xl">👋</div>
              <p>Comece uma conversa!</p>
            </div>
          </div>
        ) : (
          <>
            {groupedMessages.map((group) => (
              <div key={group.date}>
                {/* Date separator */}
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-[rgba(255,255,255,0.05)]" />
                  <span className="text-xs text-[#666] px-3 py-1 rounded-full bg-[rgba(0,255,154,0.05)] border border-[rgba(0,255,154,0.1)]">
                    {group.date}
                  </span>
                  <div className="flex-1 h-px bg-[rgba(255,255,255,0.05)]" />
                </div>

                {/* Messages for this date */}
                {group.messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    text={msg.text}
                    time={new Date(msg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    isSent={msg.isSent}
                  />
                ))}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start mb-3">
                <div className="bg-[#1A1A1A] rounded-2xl rounded-bl-none px-4 py-2.5 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#666] animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-[#666] animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 rounded-full bg-[#666] animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input area - fixed */}
      <div className="flex-shrink-0 p-4 bg-[#0F0F0F] border-t border-[rgba(0,255,154,0.1)]">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            placeholder="Digite uma mensagem..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[rgba(0,255,149,0.2)] text-white placeholder:text-[#666] outline-none focus:border-[#00FF95] focus:shadow-lg focus:shadow-[#00FF95]/20 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!messageInput.trim() || loading}
            className="flex-shrink-0 h-12 w-12 rounded-full bg-[#00FF95] hover:bg-[#00CC7A] text-black flex items-center justify-center transition-all disabled:opacity-50 shadow-lg shadow-[#00FF95]/30"
            aria-label="Enviar"
          >
            {loading ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
