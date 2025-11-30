import React, { useState } from 'react'
import { 
  Search, Send, Phone, Info, MoreVertical, Paperclip, Smile, X, MessageCircle, 
  ChevronDown, ArrowRight, Edit2, Plus, FileText, Image,
  User, Mail, Tag, AlertCircle, Volume2, Share2
} from 'lucide-react'
import { mockData } from '@/mocks/premium-mock-data'

const PaperclipIcon = Paperclip

interface TagBadge {
  name: string
  color: string
  bgColor: string
}

interface TransferModalState {
  open: boolean
  selectedSector?: string
  selectedUser?: string
}

const getTagStyles = (tagName: string): TagBadge => {
  const tagMap: Record<string, TagBadge> = {
    'SUPORTE': { name: 'SUPORTE', color: '#10B981', bgColor: 'bg-emerald-500/20' },
    'PRIORIDADE': { name: 'PRIORIDADE', color: '#EF4444', bgColor: 'bg-red-500/20' },
    'LEAD_QUENTE': { name: 'LEAD QUENTE', color: '#F59E0B', bgColor: 'bg-amber-500/20' },
    'VIP': { name: 'VIP', color: '#A855F7', bgColor: 'bg-purple-500/20' },
    'IMPLANTACAO': { name: 'IMPLANTAÇÃO', color: '#06B6D4', bgColor: 'bg-cyan-500/20' },
    'RENOVACAO': { name: 'RENOVAÇÃO', color: '#8B5CF6', bgColor: 'bg-violet-500/20' },
    'AGENDADO': { name: 'AGENDADO', color: '#3B82F6', bgColor: 'bg-blue-500/20' },
    'LEAD_FRIO': { name: 'LEAD FRIO', color: '#6B7280', bgColor: 'bg-gray-500/20' },
  }
  return tagMap[tagName] || { name: tagName, color: '#9CA3AF', bgColor: 'bg-gray-500/20' }
}

// Mock setores (using existing system data)
const MOCK_SECTORS = [
  { id: '1', name: 'Atendimento', color: '#00FF9A' },
  { id: '2', name: 'Vendas', color: '#00D4FF' },
  { id: '3', name: 'Suporte', color: '#FF006E' }
]

// Mock users (using existing system data)
const MOCK_USERS = [
  { id: '1', name: 'Ana Ferreira', sector: 'Atendimento' },
  { id: '2', name: 'Bruno Xavier', sector: 'Vendas' },
  { id: '3', name: 'Daniel Lima', sector: 'Suporte' }
]

// Tabs for right panel
type RightPanelTab = 'info' | 'notas' | 'arquivos' | 'observacoes' | 'campos'

export default function ConversasPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(
    mockData.conversations[0]?.id || null
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTab, setFilterTab] = useState('novos') // novos, meus, outros
  const [rightPanelTab, setRightPanelTab] = useState<RightPanelTab>('info')
  const [rightPanelOpen, setRightPanelOpen] = useState(false) // Sidebar visibility
  const [transferModal, setTransferModal] = useState<TransferModalState>({ open: false })
  const [completeDropdown, setCompleteDropdown] = useState(false)
  const [expandedNotes, setExpandedNotes] = useState(false)

  const filteredConversations = mockData.conversations.filter(conv =>
    conv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.clientPhone.includes(searchTerm)
  )

  const selectedConv = mockData.conversations.find(c => c.id === selectedConversation)

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Main Layout - 3 Columns Helena CRM Style */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* COLUMN 1: LEFT SIDEBAR - Conversation List */}
        <div className="w-80 border-r border-[#1a1a2e] bg-[#0f0f1e] flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="p-4 border-b border-[#1a1a2e]">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-[#00FF84]" />
              Conversas
            </h2>
            
            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00FF84]"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 text-xs">
              {['novos', 'meus', 'outros'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterTab(tab)}
                  className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                    filterTab === tab
                      ? 'bg-[#00FF84] text-black'
                      : 'bg-[#1a1a2e] text-gray-400 hover:text-white'
                  }`}
                >
                  {tab === 'novos' ? 'Novos' : tab === 'meus' ? 'Meus' : 'Outros'}
                </button>
              ))}
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`w-full text-left px-4 py-3 border-l-4 transition-all hover:bg-white/5 group ${
                  selectedConversation === conversation.id
                    ? 'border-l-[#00FF84] bg-white/10'
                    : 'border-l-transparent'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar with Status */}
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#1a1a2e] flex items-center justify-center text-lg">
                      {conversation.clientAvatar}
                    </div>
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0f0f1e] ${
                        conversation.status === 'online'
                          ? 'bg-emerald-500'
                          : conversation.status === 'away'
                            ? 'bg-yellow-500'
                            : 'bg-gray-600'
                      }`}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-white truncate">
                        {conversation.clientName}
                      </h3>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-[#00FF84] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-400 mb-1">
                      {conversation.clientPhone}
                    </p>

                    <p className="text-xs text-gray-500 truncate mb-2">
                      {conversation.lastMessage}
                    </p>

                    {/* Tags */}
                    {conversation.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {conversation.tags.slice(0, 1).map((tagName, idx) => {
                          const tag = getTagStyles(tagName)
                          return (
                            <span
                              key={idx}
                              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tag.bgColor}`}
                              style={{ color: tag.color }}
                            >
                              {tag.name}
                            </span>
                          )
                        })}
                        {conversation.tags.length > 1 && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-500/20 text-gray-400">
                            +{conversation.tags.length - 1}
                          </span>
                        )}
                      </div>
                    )}

                    <p className="text-xs text-gray-600">
                      {conversation.lastMessageTime}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* COLUMN 2: CENTER - Chat Window */}
        <div className="flex-1 flex flex-col bg-[#0a0a0a] overflow-hidden">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="border-b border-[#1a1a2e] px-6 py-4 flex items-center justify-between bg-[#0f0f1e]">
                <div className="flex items-center gap-4 flex-1">
                  {/* Avatar + Info */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#1a1a2e] flex items-center justify-center text-2xl">
                      {selectedConv.clientAvatar}
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[#0f0f1e] ${
                        selectedConv.status === 'online'
                          ? 'bg-emerald-500'
                          : selectedConv.status === 'away'
                            ? 'bg-yellow-500'
                            : 'bg-gray-600'
                      }`}
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white text-lg">{selectedConv.clientName}</h3>
                    <p className="text-sm text-gray-400">{selectedConv.clientPhone}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {/* Info Button - Opens Sidebar */}
                  <button
                    onClick={() => setRightPanelOpen(true)}
                    className="px-4 py-2 rounded-lg bg-[#1a1a2e] text-gray-300 hover:bg-[#2a2a3e] hover:text-white text-sm font-medium transition-all flex items-center gap-2"
                  >
                    <Info className="h-4 w-4" />
                    Info
                  </button>

                  {/* Transferir */}
                  <button
                    onClick={() => setTransferModal({ ...transferModal, open: true })}
                    className="px-4 py-2 rounded-lg bg-[#1a1a2e] text-gray-300 hover:bg-[#2a2a3e] hover:text-white text-sm font-medium transition-all flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Transferir
                  </button>

                  {/* Concluir */}
                  <div className="relative">
                    <button
                      onClick={() => setCompleteDropdown(!completeDropdown)}
                      className="px-4 py-2 rounded-lg bg-[#00FF84] text-black hover:bg-[#00FF84]/90 text-sm font-medium transition-all flex items-center gap-2"
                    >
                      ✓ Concluir
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {completeDropdown && (
                      <div className="absolute right-0 top-full mt-2 bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg shadow-xl z-10 min-w-48">
                        <button className="w-full text-left px-4 py-3 text-white hover:bg-[#2a2a3e] text-sm transition-all">
                          Marcar como concluído
                        </button>
                        <button className="w-full text-left px-4 py-3 text-white hover:bg-[#2a2a3e] text-sm transition-all border-t border-[#2a2a3e]">
                          Mover para Outros
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Menu */}
                  <button className="p-2 hover:bg-[#1a1a2e] rounded-lg transition-colors">
                    <MoreVertical className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-[#1a1a2e] scrollbar-track-transparent pb-28">
                {mockData.messages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-3 ${msg.sender === 'client' ? 'justify-start' : 'justify-end'}`}>
                    {msg.sender === 'client' && (
                      <div className="w-8 h-8 rounded-full bg-[#1a1a2e] flex items-center justify-center text-sm flex-shrink-0">
                        {selectedConv.clientAvatar}
                      </div>
                    )}
                    
                    <div className={`max-w-xs ${msg.sender === 'agent' ? 'order-2' : ''}`}>
                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm ${
                          msg.sender === 'client'
                            ? 'bg-[#1a1a2e] text-white rounded-bl-none'
                            : 'bg-[#00FF84] text-black rounded-br-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <p className={`text-xs mt-1 ${msg.sender === 'client' ? 'text-left' : 'text-right'} text-gray-500`}>
                        {msg.timestamp}
                      </p>
                    </div>

                    {msg.sender === 'agent' && (
                      <div className="w-8 h-8 rounded-full bg-[#00FF84] flex items-center justify-center text-sm flex-shrink-0">
                        👨‍💼
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Message Composer - STICKY no rodapé da coluna */}
              <div className="sticky bottom-0 z-20 border-t border-[#1a1a2e] bg-[#0f0f1e] p-4">
                <div className="flex items-center gap-2 mb-3">
                  {/* Country Selector */}
                  <div className="flex items-center bg-[#1a1a2e] rounded-lg px-3 py-2 text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">
                    <span>+55 ▼</span>
                  </div>

                  {/* Phone Number */}
                  <input
                    type="text"
                    placeholder="Número..."
                    value={selectedConv.clientPhone}
                    className="w-32 px-3 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00FF84]"
                  />

                  {/* Conversar Button */}
                  <button className="px-6 py-2 rounded-lg bg-[#1a1a2e] text-[#00FF84] hover:bg-[#2a2a3e] text-sm font-medium transition-all">
                    Conversar
                  </button>
                </div>

                {/* Message Input */}
                <div className="flex items-center gap-2 bg-[#1a1a2e] rounded-2xl px-4 py-3">
                  {/* Icon Buttons */}
                  <button className="p-1.5 hover:bg-[#2a2a3e] rounded-lg transition-colors text-gray-400 hover:text-white" title="Anexo">
                    <PaperclipIcon className="h-5 w-5" />
                  </button>
                  <button className="p-1.5 hover:bg-[#2a2a3e] rounded-lg transition-colors text-gray-400 hover:text-white" title="Mídia">
                    <Image className="h-5 w-5" />
                  </button>
                  <button className="p-1.5 hover:bg-[#2a2a3e] rounded-lg transition-colors text-gray-400 hover:text-white" title="Emoji">
                    <Smile className="h-5 w-5" />
                  </button>
                  <button className="p-1.5 hover:bg-[#2a2a3e] rounded-lg transition-colors text-gray-400 hover:text-white" title="Tags">
                    <Tag className="h-5 w-5" />
                  </button>

                  {/* Message Input */}
                  <input
                    type="text"
                    placeholder="Escreva a mensagem..."
                    className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
                  />

                  {/* Audio & Send */}
                  <button className="p-1.5 hover:bg-[#2a2a3e] rounded-lg transition-colors text-gray-400 hover:text-white" title="Áudio">
                    <Volume2 className="h-5 w-5" />
                  </button>
                  <button className="p-1.5 hover:bg-[#2a2a3e] rounded-lg transition-colors text-[#00FF84] hover:text-[#00FF84]/80">
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg">Selecione uma conversa</p>
              </div>
            </div>
          )}
        </div>

        {/* COLUMN 3: RIGHT SIDEBAR - Contact Info (Modal Drawer) */}
        {selectedConv && rightPanelOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setRightPanelOpen(false)}
            />
            
            {/* Drawer Sidebar */}
            <div className="fixed right-0 top-0 bottom-0 w-96 border-l border-[#1a1a2e] bg-[#0f0f1e] flex flex-col overflow-hidden z-50 shadow-2xl animate-in slide-in-from-right">
            
            {/* Header with Close */}
            <div className="border-b border-[#1a1a2e] px-4 py-3 flex items-center justify-between">
              <h3 className="font-semibold text-white">Informações</h3>
              <button className="p-1 hover:bg-[#1a1a2e] rounded transition-colors">
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-[#1a1a2e] px-4 py-2 flex gap-2 overflow-x-auto">
              {(['info', 'notas', 'arquivos', 'observacoes', 'campos'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setRightPanelTab(tab)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                    rightPanelTab === tab
                      ? 'bg-[#00FF84] text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab === 'info' ? 'Info' : tab === 'notas' ? 'Notas' : tab === 'arquivos' ? 'Arquivos' : tab === 'observacoes' ? 'Observações' : 'Campos'}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {rightPanelTab === 'info' && (
                <div className="space-y-4">
                  {/* Dados do Contato */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Dados do Contato</h4>
                    
                    {/* Name */}
                    <div className="mb-3">
                      <label className="text-xs text-gray-500 mb-1 block">Nome</label>
                      <div className="flex items-center gap-2 bg-[#1a1a2e] rounded-lg px-3 py-2 text-white">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{selectedConv.clientName}</span>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="mb-3">
                      <label className="text-xs text-gray-500 mb-1 block">Telefone</label>
                      <div className="flex items-center gap-2 bg-[#1a1a2e] rounded-lg px-3 py-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-white flex-1">{selectedConv.clientPhone}</span>
                        <button className="p-1 hover:bg-[#2a2a3e] rounded transition-colors">
                          <Share2 className="h-4 w-4 text-[#00FF84]" />
                        </button>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                      <label className="text-xs text-gray-500 mb-1 block">Email</label>
                      <div className="flex items-center gap-2 bg-[#1a1a2e] rounded-lg px-3 py-2 text-gray-500">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">-</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mb-3">
                      <label className="text-xs text-gray-500 mb-2 block flex items-center justify-between">
                        <span>Etiquetas</span>
                        <button className="text-[#00FF84] hover:text-[#00FF84]/80">
                          <Plus className="h-4 w-4" />
                        </button>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedConv.tags.map((tagName, idx) => {
                          const tag = getTagStyles(tagName)
                          return (
                            <div
                              key={idx}
                              className={`flex items-center gap-2 ${tag.bgColor} px-3 py-1.5 rounded-full group cursor-pointer`}
                            >
                              <span className="text-xs font-semibold" style={{ color: tag.color }}>
                                {tag.name}
                              </span>
                              <X className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: tag.color }} />
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Edit Button */}
                    <button className="w-full px-3 py-2 mt-3 rounded-lg bg-[#1a1a2e] text-white hover:bg-[#2a2a3e] text-sm font-medium transition-all flex items-center justify-center gap-2">
                      <Edit2 className="h-4 w-4" />
                      Editar
                    </button>
                  </div>

                  {/* Sequências (Empty placeholder) */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Sequências</h4>
                    <div className="text-center py-4 text-gray-500 text-xs">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      Nenhuma sequência ativa
                    </div>
                  </div>
                </div>
              )}

              {rightPanelTab === 'notas' && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Notas Internas</h4>
                  
                  {/* Add Note Button */}
                  <button className="w-full px-3 py-2 rounded-lg bg-[#1a1a2e] text-white hover:bg-[#2a2a3e] text-sm font-medium transition-all flex items-center justify-center gap-2 mb-3">
                    <Plus className="h-4 w-4" />
                    Adicionar Nota
                  </button>

                  {/* Expandable Note Section */}
                  <div className="bg-[#1a1a2e] rounded-lg p-3">
                    <button
                      onClick={() => setExpandedNotes(!expandedNotes)}
                      className="w-full flex items-center justify-between text-white text-sm font-medium mb-2"
                    >
                      <span>Últimas notas</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedNotes ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {expandedNotes && (
                      <div className="text-xs text-gray-400 py-2 border-t border-[#2a2a3e]">
                        <p>Nenhuma nota registrada</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {rightPanelTab === 'arquivos' && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Arquivos e Mídias</h4>
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">Nenhum arquivo</p>
                  </div>
                </div>
              )}

              {rightPanelTab === 'observacoes' && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Observações</h4>
                  <textarea
                    placeholder="Adicione observações sobre este contato..."
                    className="w-full px-3 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00FF84] resize-none h-32"
                  />
                </div>
              )}

              {rightPanelTab === 'campos' && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Campos Personalizados</h4>
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">Nenhum campo personalizado</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Close Button */}
            <button
              onClick={() => setRightPanelOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-[#1a1a2e] rounded transition-colors z-10"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-white" />
            </button>
            </div>
          </>
        )}
      </div>

      {/* Transfer Modal */}
      {transferModal.open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0f0f1e] border border-[#1a1a2e] rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-white mb-4">Transferir Conversa</h3>

            {/* Sector Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Para qual setor?</label>
              <div className="space-y-2">
                {MOCK_SECTORS.map((sector) => (
                  <button
                    key={sector.id}
                    onClick={() => setTransferModal({ ...transferModal, selectedSector: sector.id })}
                    className={`w-full text-left px-4 py-2.5 rounded-lg border transition-all ${
                      transferModal.selectedSector === sector.id
                        ? 'bg-[#00FF84] text-black border-[#00FF84]'
                        : 'bg-[#1a1a2e] text-white border-[#2a2a3e] hover:border-[#00FF84]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: sector.color }}
                      />
                      <span className="font-medium">{sector.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* User Selection (if sector selected) */}
            {transferModal.selectedSector && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">Para qual pessoa?</label>
                <div className="space-y-2">
                  {MOCK_USERS.filter(u => u.sector === MOCK_SECTORS.find(s => s.id === transferModal.selectedSector)?.name).map((user) => (
                    <button
                      key={user.id}
                      onClick={() => setTransferModal({ ...transferModal, selectedUser: user.id })}
                      className={`w-full text-left px-4 py-2.5 rounded-lg border transition-all ${
                        transferModal.selectedUser === user.id
                          ? 'bg-[#00FF84] text-black border-[#00FF84]'
                          : 'bg-[#1a1a2e] text-white border-[#2a2a3e] hover:border-[#00FF84]/50'
                      }`}
                    >
                      <span className="font-medium">{user.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setTransferModal({ open: false })}
                className="flex-1 px-4 py-2.5 rounded-lg bg-[#1a1a2e] text-white hover:bg-[#2a2a3e] font-medium transition-all"
              >
                Cancelar
              </button>
              <button
                disabled={!transferModal.selectedUser}
                className="flex-1 px-4 py-2.5 rounded-lg bg-[#00FF84] text-black hover:bg-[#00FF84]/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all flex items-center justify-center gap-2"
              >
                <ArrowRight className="h-4 w-4" />
                Transferir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

