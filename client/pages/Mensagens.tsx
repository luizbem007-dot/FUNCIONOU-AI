import React, { useState } from 'react'
import { Search } from 'lucide-react'
import PagePlaceholder from '@/components/PagePlaceholder'

const MOCK_MESSAGES = [
  {
    id: 'm1',
    contact: 'João Silva',
    message: 'Olá, gostaria de saber mais sobre o produto',
    time: '14:30',
    read: false,
    avatar: '👨‍💼'
  },
  {
    id: 'm2',
    contact: 'Maria Santos',
    message: 'Muito obrigada pela ajuda!',
    time: '16:20',
    read: true,
    avatar: '👩‍💼'
  },
  {
    id: 'm3',
    contact: 'Pedro Costa',
    message: 'Vou verificar e retorno',
    time: '10:15',
    read: true,
    avatar: '👨‍💻'
  },
  {
    id: 'm4',
    contact: 'Ana Paula',
    message: 'Qual é o horário de funcionamento?',
    time: '09:45',
    read: false,
    avatar: '👩‍💻'
  }
]

export default function MensagensPage() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMessages = MOCK_MESSAGES.filter(msg =>
    msg.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#070707]">
      <PagePlaceholder
        title="Mensagens"
        description="Histórico de todas as suas mensagens"
        icon="📨"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Messages List */}
          <div className="lg:col-span-1 flex flex-col border border-[#00FF9A]/20 rounded-lg bg-white/5 overflow-hidden">
            {/* Search */}
            <div className="p-4 border-b border-[#00FF9A]/20">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Buscar mensagens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-[#00FF9A]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF9A]"
                />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#00FF9A]/10">
              {filteredMessages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg.id)}
                  className={`w-full text-left p-4 hover:bg-white/10 transition-colors border-l-4 ${
                    selectedMessage === msg.id
                      ? 'border-l-[#00FF9A] bg-white/10'
                      : 'border-l-transparent'
                  } ${!msg.read ? 'bg-white/5' : ''}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">{msg.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white">{msg.contact}</h3>
                      <p className="text-xs text-gray-500">{msg.time}</p>
                    </div>
                    {!msg.read && (
                      <div className="w-2 h-2 rounded-full bg-[#00FF9A] flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 truncate">{msg.message}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2 border border-[#00FF9A]/20 rounded-lg bg-white/5 flex flex-col">
            {selectedMessage ? (
              <>
                {/* Header */}
                <div className="border-b border-[#00FF9A]/20 p-4">
                  {(() => {
                    const msg = MOCK_MESSAGES.find(m => m.id === selectedMessage)
                    return msg ? (
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{msg.avatar}</div>
                        <div>
                          <h3 className="font-semibold text-white">{msg.contact}</h3>
                          <p className="text-xs text-gray-400">Mensagem de {msg.time}</p>
                        </div>
                      </div>
                    ) : null
                  })()}
                </div>

                {/* Message Content */}
                <div className="flex-1 p-6 flex items-center justify-center">
                  <div className="text-center max-w-md">
                    <p className="text-lg text-white mb-2">
                      "{MOCK_MESSAGES.find(m => m.id === selectedMessage)?.message}"
                    </p>
                    <p className="text-sm text-gray-400">
                      Recebida em {MOCK_MESSAGES.find(m => m.id === selectedMessage)?.time}
                    </p>
                  </div>
                </div>

                {/* Reply Area */}
                <div className="border-t border-[#00FF9A]/20 p-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Digite uma resposta..."
                    className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-[#00FF9A]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF9A]"
                  />
                  <button className="px-6 py-2 rounded-lg bg-[#00FF9A] text-black hover:bg-[#00FF9A]/80 font-medium">
                    Responder
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <p>Selecione uma mensagem para visualizar</p>
              </div>
            )}
          </div>
        </div>
      </PagePlaceholder>
    </div>
  )
}
