import React from 'react'
import { MessageSquare, Edit2, Trash2, Activity } from 'lucide-react'
import { useCRM } from '@/context/CRMContext'
import { useContactSidebar } from '@/hooks/useContactSidebar'
import { Customer } from '@/context/CRMContext'

interface ContactActionMenuProps {
  customer: Customer
  onClose: () => void
}

export default function ContactActionMenu({ customer, onClose }: ContactActionMenuProps) {
  const { updateCustomer } = useCRM()
  const { openSidebar } = useContactSidebar()

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja excluir ${customer.name}?`)) {
      updateCustomer(customer.id, { name: '', phone: '' } as any)
      onClose()
    }
  }

  return (
    <div
      className="absolute right-0 mt-2 w-48 bg-[#0F0F0F] border rounded-lg shadow-lg z-50 overflow-hidden"
      style={{ borderColor: 'rgba(0,255,154,0.1)' }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => {
          window.open(`/dashboard?contact=${customer.id}`, '_blank')
          onClose()
        }}
        className="w-full px-4 py-3 text-left hover:bg-[#1A1A1A] flex items-center gap-3 transition-colors border-b"
        style={{ borderColor: 'rgba(0,255,154,0.06)' }}
      >
        <MessageSquare className="h-4 w-4 text-[#00FF9A]" />
        <span className="text-sm text-white">Abrir Conversa</span>
      </button>

      <button
        onClick={() => {
          openSidebar(customer.id)
          onClose()
        }}
        className="w-full px-4 py-3 text-left hover:bg-[#1A1A1A] flex items-center gap-3 transition-colors border-b"
        style={{ borderColor: 'rgba(0,255,154,0.06)' }}
      >
        <Edit2 className="h-4 w-4 text-[#00D4FF]" />
        <span className="text-sm text-white">Editar</span>
      </button>

      <button
        onClick={() => {
          const customer_activities = customer.activities || []
          console.log('Activities:', customer_activities)
          onClose()
        }}
        className="w-full px-4 py-3 text-left hover:bg-[#1A1A1A] flex items-center gap-3 transition-colors border-b"
        style={{ borderColor: 'rgba(0,255,154,0.06)' }}
      >
        <Activity className="h-4 w-4 text-[#FFB800]" />
        <span className="text-sm text-white">Ver Atividades</span>
      </button>

      <button
        onClick={handleDelete}
        className="w-full px-4 py-3 text-left hover:bg-red-500/10 flex items-center gap-3 transition-colors"
      >
        <Trash2 className="h-4 w-4 text-red-500" />
        <span className="text-sm text-red-500">Excluir</span>
      </button>
    </div>
  )
}
