import React, { useState } from 'react'
import { Send, Copy, Eye, AlertCircle, CheckCircle2 } from 'lucide-react'
import PagePlaceholder from '@/components/PagePlaceholder'
import Modal from '@/components/Modal'
import { mockData } from '@/mocks/premium-mock-data'

export default function DisparoPage() {
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set())
  const [message, setMessage] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const mockContacts = mockData.contacts

  const handleSelectContact = (id: string) => {
    const newSet = new Set(selectedContacts)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setSelectedContacts(newSet)
  }

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedContacts(new Set(mockContacts.map(c => c.id)))
    } else {
      setSelectedContacts(new Set())
    }
  }

  const handleSendBlast = () => {
    if (selectedContacts.size === 0 || !message.trim()) {
      alert('Selecione contatos e digite uma mensagem')
      return
    }
    setShowConfirmation(true)
  }

  const handleConfirmSend = () => {
    console.log('Enviando disparo para', selectedContacts.size, 'contatos')
    console.log('Mensagem:', message)
    setShowConfirmation(false)
    setMessage('')
    setSelectedContacts(new Set())
    alert('Disparo enviado com sucesso!')
  }

  const substituteMessage = (text: string, name: string) => {
    return text.replace('{{nome}}', name)
  }

  const selectedContactsData = Array.from(selectedContacts).map(id => mockContacts.find(c => c.id === id)).filter(Boolean)

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <PagePlaceholder
        title="Disparo em Massa"
        description="Envie mensagens para múltiplos contatos simultaneamente"
        icon="📤"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 -mt-4">
          {/* Contacts Selection */}
          <div className="lg:col-span-1 border border-[#1a1a2e] rounded-2xl bg-[#0f0f1e] overflow-hidden flex flex-col max-h-[calc(100vh-200px)]">
            <div className="p-4 border-b border-[#1a1a2e]">
              <h3 className="text-lg font-semibold text-white mb-4">Selecione Contatos</h3>

              <label className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded transition-colors">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedContacts.size === mockContacts.length && mockContacts.length > 0}
                  className="w-4 h-4 rounded cursor-pointer"
                />
                <span className="text-sm font-semibold text-white">Selecionar Todos ({mockContacts.length})</span>
              </label>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {mockContacts.map((contact) => (
                <label key={contact.id} className="flex items-start gap-3 cursor-pointer hover:bg-white/5 p-3 rounded-lg transition-colors border border-transparent hover:border-[#1a1a2e]">
                  <input
                    type="checkbox"
                    checked={selectedContacts.has(contact.id)}
                    onChange={() => handleSelectContact(contact.id)}
                    className="w-4 h-4 rounded cursor-pointer mt-0.5 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{contact.name}</p>
                    <p className="text-xs text-gray-500 truncate">{contact.phone}</p>
                    <p className="text-xs text-gray-600">R$ {contact.value.toLocaleString('pt-BR')}</p>
                  </div>
                  {selectedContacts.has(contact.id) && (
                    <CheckCircle2 className="h-4 w-4 text-[#00FF84] flex-shrink-0" />
                  )}
                </label>
              ))}
            </div>

            <div className="border-t border-[#1a1a2e] p-4 sticky bottom-0 bg-[#0f0f1e]">
              <div className="p-3 rounded-lg bg-[#00FF84]/10 border border-[#00FF84]/30">
                <p className="text-sm font-bold text-[#00FF84]">
                  {selectedContacts.size} contato(s) selecionado(s)
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {Math.ceil(selectedContacts.size / 10)} envios de 10 contatos cada
                </p>
              </div>
            </div>
          </div>

          {/* Message Composition */}
          <div className="lg:col-span-2 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* Message Input */}
            <div className="border border-[#1a1a2e] rounded-2xl bg-[#0f0f1e] p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Send className="h-5 w-5 text-[#00FF84]" />
                Composição da Mensagem
              </h3>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Olá {{nome}}, gostaria de oferecer nossos serviços premium..."
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF84] transition-colors resize-none font-mono text-sm"
              />

              <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-blue-300 mb-1">Dica de Personalização</p>
                  <p className="text-xs text-blue-200">Use <code className="bg-black/30 px-2 py-0.5 rounded text-[#00FF84]">{'{{nome}}'}</code> para inserir o nome do contato automaticamente</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                <span>{message.length} caracteres</span>
                <button
                  onClick={() => setShowPreview(true)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-[#00FF84]"
                >
                  <Eye className="h-4 w-4" />
                  Visualizar
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="border border-[#1a1a2e] rounded-2xl bg-[#0f0f1e] p-4">
                <p className="text-xs text-gray-400 mb-2">MENSAGENS TOTAIS</p>
                <p className="text-2xl font-bold text-white">{selectedContacts.size}</p>
                <p className="text-xs text-gray-500 mt-1">contatos selecionados</p>
              </div>

              <div className="border border-[#1a1a2e] rounded-2xl bg-[#0f0f1e] p-4">
                <p className="text-xs text-gray-400 mb-2">CARACTERES</p>
                <p className="text-2xl font-bold text-white">{message.length}</p>
                <p className="text-xs text-gray-500 mt-1">por mensagem</p>
              </div>

              <div className="border border-[#1a1a2e] rounded-2xl bg-[#0f0f1e] p-4">
                <p className="text-xs text-gray-400 mb-2">TEMPO ESTIMADO</p>
                <p className="text-2xl font-bold text-white">{Math.max(1, Math.ceil(selectedContacts.size / 10))}min</p>
                <p className="text-xs text-gray-500 mt-1">para envio total</p>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleSendBlast}
              disabled={selectedContacts.size === 0 || !message.trim()}
              className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-[#00FF84] to-[#00FF95] text-black hover:shadow-lg hover:shadow-[#00FF84]/30 disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-all text-lg"
            >
              <Send className="w-5 h-5" />
              Enviar Disparo
            </button>
          </div>
        </div>
      </PagePlaceholder>

      {/* Preview Modal */}
      {showPreview && (
        <Modal onClose={() => setShowPreview(false)}>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Prévia das Mensagens</h2>

            <div className="space-y-3 max-h-96 overflow-y-auto mb-6">
              {selectedContactsData.slice(0, 5).map((contact) => (
                <div key={contact?.id} className="border border-[#1a1a2e] rounded-lg bg-[#1a1a2e] p-4">
                  <p className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                    <span>{contact?.avatar}</span>
                    <strong>{contact?.name}</strong>
                  </p>
                  <p className="text-sm text-white p-3 bg-[#0a0a0a] rounded border border-[#2a2a3e]">
                    {substituteMessage(message, contact?.name || '')}
                  </p>
                </div>
              ))}
              {selectedContacts.size > 5 && (
                <p className="text-xs text-gray-500 px-4 py-2">
                  ... e mais {selectedContacts.size - 5} mensagem(ns)
                </p>
              )}
            </div>

            <button
              onClick={() => setShowPreview(false)}
              className="w-full px-4 py-2 rounded-lg bg-[#00FF84] text-black hover:bg-[#00FF84]/80 transition-colors font-semibold"
            >
              Fechar
            </button>
          </div>
        </Modal>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <Modal onClose={() => setShowConfirmation(false)}>
          <div className="max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-yellow-400" />
              Confirmar Envio
            </h2>

            <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-lg p-4 mb-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Contatos selecionados:</span>
                <span className="font-bold text-[#00FF84]">{selectedContacts.size}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Caracteres por mensagem:</span>
                <span className="font-bold text-white">{message.length}</span>
              </div>
              <div className="pt-3 border-t border-[#2a2a3e]">
                <p className="text-xs text-gray-400 mb-2">Prévia:</p>
                <p className="text-sm text-white italic bg-[#0a0a0a] p-2 rounded border border-[#2a2a3e]">
                  "{substituteMessage(message, 'João Silva').substring(0, 100)}{substituteMessage(message, 'João Silva').length > 100 ? '...' : ''}"
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] text-white hover:bg-[#2a2a3e] transition-colors font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmSend}
                className="flex-1 px-4 py-2 rounded-lg bg-[#00FF84] text-black hover:bg-[#00FF84]/80 transition-colors font-semibold"
              >
                Confirmar e Enviar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
