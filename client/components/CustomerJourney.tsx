import React from 'react'
import { MessageSquare, Tag, CheckCircle, AlertCircle, Plus, Edit2, MessageCircle, Target, Phone } from 'lucide-react'
import { useCRM } from '@/context/CRMContext'
import { cn } from '@/lib/utils'

interface CustomerJourneyProps {
  customerId: string
}

export default function CustomerJourney({ customerId }: CustomerJourneyProps) {
  const { getCustomerActivities, customers } = useCRM()
  const customer = customers.find(c => c.id === customerId)
  const activities = getCustomerActivities(customerId)

  if (!customer) {
    return <div className="text-[#999]">Contato não encontrado</div>
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'tag_added':
      case 'tag_removed':
        return <Tag className="h-4 w-4" />
      case 'stage_changed':
        return <Target className="h-4 w-4" />
      case 'note_added':
        return <MessageCircle className="h-4 w-4" />
      case 'task_created':
      case 'task_completed':
        return <CheckCircle className="h-4 w-4" />
      case 'conversation_started':
        return <MessageSquare className="h-4 w-4" />
      case 'contact_created':
      case 'imported_contact_added':
        return <Plus className="h-4 w-4" />
      case 'contact_imported':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'tag_added':
      case 'tag_removed':
        return 'text-[#00FF9A]'
      case 'stage_changed':
        return 'text-[#00D4FF]'
      case 'note_added':
        return 'text-[#FFB800]'
      case 'task_created':
      case 'task_completed':
        return 'text-[#50E991]'
      case 'conversation_started':
        return 'text-[#FF006E]'
      case 'contact_created':
      case 'imported_contact_added':
        return 'text-[#00FF9A]'
      case 'contact_imported':
        return 'text-[#FFB800]'
      default:
        return 'text-[#999]'
    }
  }

  const getActivityBgColor = (type: string) => {
    switch (type) {
      case 'tag_added':
      case 'tag_removed':
        return 'bg-[#00FF9A]/10'
      case 'stage_changed':
        return 'bg-[#00D4FF]/10'
      case 'note_added':
        return 'bg-[#FFB800]/10'
      case 'task_created':
      case 'task_completed':
        return 'bg-[#50E991]/10'
      case 'conversation_started':
        return 'bg-[#FF006E]/10'
      case 'contact_created':
      case 'imported_contact_added':
        return 'bg-[#00FF9A]/10'
      case 'contact_imported':
        return 'bg-[#FFB800]/10'
      default:
        return 'bg-[#0F0F0F]'
    }
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-8 w-8 text-[#666] mx-auto mb-3" />
        <p className="text-[#999] mb-1">Nenhuma atividade registrada</p>
        <p className="text-[#666] text-sm">As atividades aparecerão aqui conforme o contato se move pelo funil</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00FF9A] via-[#00D4FF] to-[#00FF9A]/20" />

        {/* Activities */}
        <div className="space-y-6 ml-20">
          {activities.map((activity, index) => (
            <div key={activity.id} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-14 top-2 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: getActivityBgColor(activity.type).replace('bg-', '').replace('/10', '') }}>
                <div className={cn('p-2 rounded-full', getActivityColor(activity.type), getActivityBgColor(activity.type))}>
                  {getActivityIcon(activity.type)}
                </div>
              </div>

              {/* Card */}
              <div className="p-4 rounded-lg border transition-all hover:border-[#00FF9A]/50" style={{ borderColor: 'rgba(0,255,154,0.1)' }}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-white text-sm">{activity.description}</h4>
                    <p className="text-xs text-[#666] mt-1">
                      {new Date(activity.timestamp).toLocaleDateString('pt-BR')} às {new Date(activity.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                {/* Values */}
                {(activity.previousValue || activity.newValue) && (
                  <div className="mt-2 text-xs space-y-1 bg-[#0F0F0F]/50 p-2 rounded">
                    {activity.previousValue && (
                      <div className="text-[#999]">
                        <span className="font-semibold">Anterior:</span> <span className="text-[#666]">{activity.previousValue}</span>
                      </div>
                    )}
                    {activity.newValue && (
                      <div className="text-[#00FF9A]">
                        <span className="font-semibold">Novo:</span> <span className="text-[#00FF9A]/80">{activity.newValue}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* User Info */}
                {activity.userId && (
                  <div className="mt-2 text-xs text-[#666]">
                    Realizado por <span className="text-[#999]">{activity.userId}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t" style={{ borderColor: 'rgba(0,255,154,0.1)' }}>
        <div className="p-4 rounded-lg bg-[#0F0F0F]" style={{ borderColor: 'rgba(0,255,154,0.06)' }}>
          <div className="text-xs text-[#666] mb-1">Total de Atividades</div>
          <div className="text-2xl font-bold text-[#00FF9A]">{activities.length}</div>
        </div>

        <div className="p-4 rounded-lg bg-[#0F0F0F]" style={{ borderColor: 'rgba(0,255,154,0.06)' }}>
          <div className="text-xs text-[#666] mb-1">Última Atividade</div>
          <div className="text-sm font-semibold text-white">
            {new Date(activities[0]?.timestamp || new Date()).toLocaleDateString('pt-BR')}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#0F0F0F]" style={{ borderColor: 'rgba(0,255,154,0.06)' }}>
          <div className="text-xs text-[#666] mb-1">Tempo no Funil</div>
          <div className="text-sm font-semibold text-white">
            {Math.floor((Date.now() - new Date(customer.createdAt).getTime()) / (1000 * 60 * 60 * 24))} dias
          </div>
        </div>
      </div>
    </div>
  )
}
