import React, { useState } from 'react'
import { X } from 'lucide-react'
import { useCRM } from '@/context/CRMContext'
import { cn } from '@/lib/utils'

interface ContactModalProps {
  onClose: () => void
  customerId?: string
}

export default function ContactModal({ onClose, customerId }: ContactModalProps) {
  const { customers, updateCustomer, sectors, availableTags } = useCRM()
  const customer = customerId ? customers.find(c => c.id === customerId) : null

  const [formData, setFormData] = useState({
    name: customer?.name || '',
    phone: customer?.phone || '',
    email: customer?.email || '',
    sector: customer?.sector || '',
    origin: customer?.origin || 'Manual',
    tags: customer?.tags || [],
    notes: customer?.notes_internal || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customer && customerId) {
      updateCustomer(customerId, {
        ...formData,
        notes_internal: formData.notes
      } as any)
    }
    onClose()
  }

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag as any)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag as any]
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0F0F0F] rounded-lg border w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ borderColor: 'rgba(0,255,154,0.2)' }}>
        {/* Header */}
        <div className="sticky top-0 p-6 border-b flex items-center justify-between bg-[#0F0F0F]" style={{ borderColor: 'rgba(0,255,154,0.1)' }}>
          <h3 className="font-bold text-lg">{customer ? 'Editar Contato' : 'Novo Contato'}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#1A1A1A] rounded transition-colors"
          >
            <X className="h-5 w-5 text-[#666]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[#00FF9A]">Informações Básicas</h4>
            
            <div>
              <label className="text-sm font-semibold text-[#999] mb-2 block">Nome *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-white"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-[#999] mb-2 block">Telefone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-white"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#999] mb-2 block">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-white"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                />
              </div>
            </div>
          </div>

          {/* Sector & Origin */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[#00FF9A]">Organização</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-[#999] mb-2 block">Setor</label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-white"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <option value="">Selecionar setor</option>
                  {sectors.map(sector => (
                    <option key={sector.id} value={sector.id}>{sector.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-[#999] mb-2 block">Origem</label>
                <select
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="w-full px-4 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-white"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <option>Manual</option>
                  <option>WhatsApp</option>
                  <option>Instagram</option>
                  <option>Telefone</option>
                  <option>Email</option>
                  <option>Site</option>
                  <option>Referência</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[#00FF9A]">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-semibold transition-all',
                    formData.tags.includes(tag)
                      ? 'bg-[#00FF9A] text-black'
                      : 'bg-[#00FF9A]/10 text-[#00FF9A] border border-[#00FF9A]/20'
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[#00FF9A]">Notas Internas</h4>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Adicione notas internas sobre este contato…"
              rows={4}
              className="w-full px-4 py-2 bg-[#1A1A1A] border rounded-lg outline-none focus:border-[#00FF9A] transition-colors text-white placeholder-[#666] resize-none"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t" style={{ borderColor: 'rgba(0,255,154,0.1)' }}>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border transition-colors hover:bg-[#1A1A1A]"
              style={{ borderColor: 'rgba(0,255,154,0.2)' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg font-semibold text-black transition-all hover:shadow-lg hover:shadow-[#00FF9A]/30"
              style={{ backgroundColor: '#00FF9A' }}
            >
              {customer ? 'Salvar Alterações' : 'Criar Contato'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
