import React, { useState } from 'react'
import { Upload, Users, MessageSquare, Send, X, Check, FileText, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCRM } from '@/context/CRMContext'

interface SelectedContact {
  id: string
  name: string
  phone: string
  stage: string
}

interface BlastHistory {
  id: string
  date: string
  contactCount: number
  status: 'completed' | 'pending' | 'error'
  messagePreview: string
}

const MOCK_BLAST_HISTORY: BlastHistory[] = [
  {
    id: '1',
    date: '2024-01-15 14:30',
    contactCount: 45,
    status: 'completed',
    messagePreview: 'Olá {{nome}}, tudo bem? Vimos seu interesse...'
  },
  {
    id: '2',
    date: '2024-01-14 10:15',
    contactCount: 32,
    status: 'completed',
    messagePreview: 'Bem-vindo {{nome}}! Sua conta foi criada...'
  },
  {
    id: '3',
    date: '2024-01-13 16:45',
    contactCount: 28,
    status: 'error',
    messagePreview: 'Lembrança: Não esqueça de confirmar seu agendamento...'
  }
]

export default function MassBlast() {
  const { customers } = useCRM()
  const [selectedContacts, setSelectedContacts] = useState<SelectedContact[]>([])
  const [message, setMessage] = useState('')
  const [showContactModal, setShowContactModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedStage, setSelectedStage] = useState<string | null>(null)
  const [showImportModal, setShowImportModal] = useState(false)
  const [importedContacts, setImportedContacts] = useState<SelectedContact[]>([])

  const handleSelectContact = (contact: SelectedContact) => {
    const isSelected = selectedContacts.some(c => c.id === contact.id)
    if (isSelected) {
      setSelectedContacts(selectedContacts.filter(c => c.id !== contact.id))
    } else {
      setSelectedContacts([...selectedContacts, contact])
    }
  }

  const handleSelectAllFromStage = (stage: string) => {
    const stageContacts = getCRMContactsForStage(stage)
    const allSelected = stageContacts.every(c => selectedContacts.some(sc => sc.id === c.id))

    if (allSelected) {
      setSelectedContacts(selectedContacts.filter(c => c.stage !== stage))
    } else {
      const newContacts = stageContacts.filter(c => !selectedContacts.some(sc => sc.id === c.id))
      setSelectedContacts([...selectedContacts, ...newContacts])
    }
  }

  const handleSelectAll = () => {
    const allContacts = customers.map(c => ({
      id: c.id,
      name: c.name,
      phone: c.phone,
      stage: stageMap[c.stage as keyof typeof stageMap]
    }))

    if (selectedContacts.length === allContacts.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(allContacts)
    }
  }

  const handleRemoveContact = (contactId: string) => {
    setSelectedContacts(selectedContacts.filter(c => c.id !== contactId))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const text = event.target?.result as string
        const lines = text.split('\n').slice(1)
        const contacts: SelectedContact[] = lines
          .map((line, index) => {
            const [name, phone] = line.split(',').map(s => s.trim())
            if (name && phone) {
              return {
                id: `imported-${index}`,
                name,
                phone,
                stage: 'Novos contatos'
              }
            }
            return null
          })
          .filter(Boolean) as SelectedContact[]
        
        setImportedContacts(contacts)
        setShowImportModal(true)
      }
      reader.readAsText(file)
    }
  }

  const handleConfirmImport = () => {
    setSelectedContacts([...selectedContacts, ...importedContacts])
    setImportedContacts([])
    setShowImportModal(false)
  }

  const handleSendBlast = () => {
    if (selectedContacts.length === 0 || !message.trim()) {
      return
    }
    setShowConfirmModal(true)
  }

  const handleConfirmSend = () => {
    console.log('Enviando disparo para', selectedContacts.length, 'contatos')
    console.log('Mensagem:', message)
    setShowConfirmModal(false)
    setSelectedContacts([])
    setMessage('')
  }

  const stageMap = {
    new: 'Novos contatos',
    attending: 'Em atendimento',
    waiting: 'Aguardando retorno',
    completed: 'Concluído'
  }

  const stages = Object.values(stageMap)

  const getCRMContactsForStage = (stageName: string) => {
    const stageKey = Object.entries(stageMap).find(([_, value]) => value === stageName)?.[0]
    if (!stageKey) return []
    return customers
      .filter(c => c.stage === stageKey)
      .map(c => ({
        id: c.id,
        name: c.name,
        phone: c.phone,
        stage: stageName
      }))
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-y-auto">
      {/* Header Section */}
      <div className="border-b p-6 md:p-8" style={{ borderColor: 'rgba(0,255,154,0.06)' }}>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Disparo em Massa</h1>
        <p className="text-[#999] text-sm md:text-base">Envie mensagens personalizadas para vários contatos ao mesmo tempo.</p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Contact Selection and Message */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card 1: Contact Selection */}
            <div className="rounded-lg border p-6" style={{ borderColor: 'rgba(0,255,154,0.1)', backgroundColor: 'rgba(10,10,10,0.8)' }}>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-[#00FF9A]" />
                Selecione os Contatos
              </h2>

              <div className="space-y-4">
                {/* Buttons */}
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="flex-1 min-w-[200px] px-4 py-3 rounded-lg border font-semibold text-sm transition-all hover:bg-[#1A1A1A] flex items-center justify-center gap-2"
                    style={{ borderColor: 'rgba(0,255,154,0.2)' }}
                  >
                    <Users className="h-4 w-4" />
                    Selecionar do CRM
                  </button>
                  <button
                    onClick={() => document.getElementById('file-upload')?.click()}
                    className="flex-1 min-w-[200px] px-4 py-3 rounded-lg border font-semibold text-sm transition-all hover:bg-[#1A1A1A] flex items-center justify-center gap-2"
                    style={{ borderColor: 'rgba(0,255,154,0.2)' }}
                  >
                    <Upload className="h-4 w-4" />
                    Importar CSV/XLSX
                  </button>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".csv,.xlsx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {/* Selected Contacts Display */}
                {selectedContacts.length > 0 && (
                  <div className="mt-6 p-4 rounded-lg border" style={{ borderColor: 'rgba(0,255,154,0.1)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-sm">
                        {selectedContacts.length} contato{selectedContacts.length !== 1 ? 's' : ''} selecionado{selectedContacts.length !== 1 ? 's' : ''}
                      </h3>
                      <button
                        onClick={() => setSelectedContacts([])}
                        className="text-xs text-[#666] hover:text-white transition-colors"
                      >
                        Limpar
                      </button>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {selectedContacts.map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-2 bg-[#0F0F0F] rounded text-sm">
                          <div>
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-xs text-[#666]">{contact.phone}</div>
                          </div>
                          <button
                            onClick={() => handleRemoveContact(contact.id)}
                            className="p-1 hover:bg-red-500/20 rounded transition-colors"
                          >
                            <X className="h-4 w-4 text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Card 2: Message Composition */}
            <div className="rounded-lg border p-6" style={{ borderColor: 'rgba(0,255,154,0.1)', backgroundColor: 'rgba(10,10,10,0.8)' }}>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#00FF9A]" />
                Mensagem
              </h2>

              <div className="space-y-3">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem…"
                  className="w-full h-40 px-4 py-3 rounded-lg bg-[#0F0F0F] border resize-none outline-none focus:border-[#00FF9A] transition-colors text-white text-sm"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                />
                <div className="text-xs text-[#666] italic">
                  💡 As variáveis serão substituídas automaticamente no envio: <span className="font-mono">{"{{nome}}"}</span>, <span className="font-mono">{"{{telefone}}"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Action and History */}
          <div className="space-y-6">
            {/* Send Button */}
            <button
              onClick={handleSendBlast}
              disabled={selectedContacts.length === 0 || !message.trim()}
              className={cn(
                'w-full px-6 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 min-h-[56px]',
                selectedContacts.length === 0 || !message.trim()
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:shadow-lg hover:shadow-[#00FF9A]/30'
              )}
              style={{ backgroundColor: '#00FF9A', color: 'black' }}
            >
              <Send className="h-5 w-5" />
              Enviar Disparo
            </button>

            {/* History Card */}
            <div className="rounded-lg border p-6" style={{ borderColor: 'rgba(0,255,154,0.1)', backgroundColor: 'rgba(10,10,10,0.8)' }}>
              <h2 className="text-lg font-bold mb-4">Histórico</h2>

              <div className="space-y-3">
                {MOCK_BLAST_HISTORY.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg border" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-xs text-[#666]">{item.date}</div>
                      <span className={cn(
                        'text-xs font-semibold px-2 py-1 rounded',
                        item.status === 'completed' && 'bg-green-500/20 text-green-400',
                        item.status === 'pending' && 'bg-yellow-500/20 text-yellow-400',
                        item.status === 'error' && 'bg-red-500/20 text-red-400'
                      )}>
                        {item.status === 'completed' && 'Concluído'}
                        {item.status === 'pending' && 'Pendente'}
                        {item.status === 'error' && 'Erro'}
                      </span>
                    </div>
                    <div className="text-sm font-medium mb-1">{item.contactCount} contatos</div>
                    <div className="text-xs text-[#999] line-clamp-2">{item.messagePreview}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Selection Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0F0F0F] rounded-lg border w-full max-w-2xl max-h-[80vh] overflow-y-auto" style={{ borderColor: 'rgba(0,255,154,0.2)' }}>
            <div className="sticky top-0 p-4 border-b flex items-center justify-between bg-[#0F0F0F]" style={{ borderColor: 'rgba(0,255,154,0.1)' }}>
              <h3 className="font-bold text-lg">Selecionar Contatos</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-1 hover:bg-[#1A1A1A] rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Select All Button */}
              <button
                onClick={handleSelectAll}
                className="w-full px-4 py-2 rounded-lg border font-semibold text-sm transition-all hover:bg-[#1A1A1A]"
                style={{ borderColor: 'rgba(0,255,154,0.2)' }}
              >
                {selectedContacts.length === customers.length ? 'Desselecionar Todos' : 'Selecionar Todos'}
              </button>

              {/* Stages */}
              {stages.map((stage) => {
                const stageContacts = getCRMContactsForStage(stage)
                const stageSelected = stageContacts.every(c => selectedContacts.some(sc => sc.id === c.id))
                
                return (
                  <div key={stage}>
                    <button
                      onClick={() => handleSelectAllFromStage(stage)}
                      className="w-full text-left p-3 rounded-lg border font-semibold text-sm transition-all hover:bg-[#1A1A1A]"
                      style={{ borderColor: stageSelected ? 'rgba(0,255,154,0.4)' : 'rgba(255,255,255,0.06)' }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{stage} ({stageContacts.length})</span>
                        {stageSelected && <Check className="h-4 w-4 text-[#00FF9A]" />}
                      </div>
                    </button>

                    <div className="mt-2 space-y-2 ml-4 pb-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      {stageContacts.map((contact) => {
                        const isSelected = selectedContacts.some(c => c.id === contact.id)
                        return (
                          <button
                            key={contact.id}
                            onClick={() => handleSelectContact(contact)}
                            className="w-full flex items-center gap-3 p-2 text-left rounded hover:bg-[#1A1A1A] transition-colors text-sm"
                          >
                            <div className={cn(
                              'h-4 w-4 rounded border flex items-center justify-center flex-shrink-0',
                              isSelected ? 'bg-[#00FF9A] border-[#00FF9A]' : 'border-[#666]'
                            )}>
                              {isSelected && <Check className="h-3 w-3 text-black" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{contact.name}</div>
                              <div className="text-xs text-[#666]">{contact.phone}</div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="sticky bottom-0 p-4 border-t bg-[#0F0F0F] flex gap-2" style={{ borderColor: 'rgba(0,255,154,0.1)' }}>
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 px-4 py-2 rounded-lg border transition-colors hover:bg-[#1A1A1A]"
                style={{ borderColor: 'rgba(0,255,154,0.2)' }}
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 px-4 py-2 rounded-lg font-semibold text-black transition-all hover:shadow-lg hover:shadow-[#00FF9A]/30"
                style={{ backgroundColor: '#00FF9A' }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Preview Modal */}
      {showImportModal && importedContacts.length > 0 && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0F0F0F] rounded-lg border w-full max-w-2xl max-h-[80vh] overflow-y-auto" style={{ borderColor: 'rgba(0,255,154,0.2)' }}>
            <div className="sticky top-0 p-4 border-b flex items-center justify-between bg-[#0F0F0F]" style={{ borderColor: 'rgba(0,255,154,0.1)' }}>
              <h3 className="font-bold text-lg">Preview da Importação</h3>
              <button
                onClick={() => {
                  setShowImportModal(false)
                  setImportedContacts([])
                }}
                className="p-1 hover:bg-[#1A1A1A] rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="text-sm text-green-400 font-semibold">
                  ✓ {importedContacts.length} contato{importedContacts.length !== 1 ? 's' : ''} importado{importedContacts.length !== 1 ? 's' : ''} com sucesso
                </div>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {importedContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded text-sm">
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-xs text-[#666]">{contact.phone}</div>
                    </div>
                    <Phone className="h-4 w-4 text-[#666]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky bottom-0 p-4 border-t bg-[#0F0F0F] flex gap-2" style={{ borderColor: 'rgba(0,255,154,0.1)' }}>
              <button
                onClick={() => {
                  setShowImportModal(false)
                  setImportedContacts([])
                }}
                className="flex-1 px-4 py-2 rounded-lg border transition-colors hover:bg-[#1A1A1A]"
                style={{ borderColor: 'rgba(0,255,154,0.2)' }}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmImport}
                className="flex-1 px-4 py-2 rounded-lg font-semibold text-black transition-all hover:shadow-lg hover:shadow-[#00FF9A]/30"
                style={{ backgroundColor: '#00FF9A' }}
              >
                Adicionar à Seleção
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0F0F0F] rounded-lg border w-full max-w-md" style={{ borderColor: 'rgba(0,255,154,0.2)' }}>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-4">Confirmar Envio</h3>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-lg bg-[#1A1A1A]">
                  <div className="text-sm text-[#999] mb-1">Contatos selecionados</div>
                  <div className="text-2xl font-bold text-[#00FF9A]">{selectedContacts.length}</div>
                </div>

                <div className="p-4 rounded-lg bg-[#1A1A1A]">
                  <div className="text-sm text-[#999] mb-2">Prévia da mensagem</div>
                  <div className="text-sm text-white max-h-24 overflow-y-auto">{message}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border transition-colors hover:bg-[#1A1A1A]"
                  style={{ borderColor: 'rgba(0,255,154,0.2)' }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmSend}
                  className="flex-1 px-4 py-2 rounded-lg font-semibold text-black transition-all hover:shadow-lg hover:shadow-[#00FF9A]/30"
                  style={{ backgroundColor: '#00FF9A' }}
                >
                  Confirmar Envio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
