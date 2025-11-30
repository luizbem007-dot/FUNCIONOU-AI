import React from 'react'
import { GripVertical, Plus } from 'lucide-react'
import PagePlaceholder from '@/components/PagePlaceholder'

interface KanbanCard {
  id: string
  title: string
  contact: string
  avatar: string
  priority: 'low' | 'medium' | 'high'
}

interface Column {
  id: string
  title: string
  color: string
  cards: KanbanCard[]
}

const KANBAN_DATA: Column[] = [
  {
    id: 'bot',
    title: '🤖 Bot',
    color: 'from-blue-500',
    cards: [
      { id: 'k1', title: 'Dúvida sobre horário de funcionamento', contact: 'João Silva', avatar: '👨', priority: 'low' },
      { id: 'k2', title: 'Solicitação de orçamento', contact: 'Maria Santos', avatar: '👩', priority: 'medium' }
    ]
  },
  {
    id: 'waiting',
    title: '⏳ Aguardando',
    color: 'from-yellow-500',
    cards: [
      { id: 'k3', title: 'Aguardando resposta de supervisor', contact: 'Pedro Costa', avatar: '👨‍💼', priority: 'high' },
      { id: 'k4', title: 'Cliente aguardando retorno', contact: 'Ana Paula', avatar: '👩‍💼', priority: 'medium' },
      { id: 'k5', title: 'Análise de documentos', contact: 'Carlos Lima', avatar: '👨‍💻', priority: 'low' }
    ]
  },
  {
    id: 'attending',
    title: '🎧 Em Atendimento',
    color: 'from-green-500',
    cards: [
      { id: 'k6', title: 'Atendimento ativo no WhatsApp', contact: 'Fernanda Costa', avatar: '👩', priority: 'high' },
      { id: 'k7', title: 'Suporte técnico', contact: 'Ricardo Silva', avatar: '👨', priority: 'high' }
    ]
  },
  {
    id: 'paused',
    title: '⏸️ Pausados',
    color: 'from-red-500',
    cards: [
      { id: 'k8', title: 'Aguardando aprovação de gerente', contact: 'Beatriz Santos', avatar: '👩‍💼', priority: 'low' }
    ]
  }
]

const priorityColors = {
  low: 'bg-green-500/20 text-green-300',
  medium: 'bg-yellow-500/20 text-yellow-300',
  high: 'bg-red-500/20 text-red-300'
}

const priorityLabels = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta'
}

export default function KanbanPage() {
  return (
    <div className="min-h-screen bg-[#070707]">
      <PagePlaceholder
        title="Atendimentos - Modo Kanban"
        description="Gerencie o fluxo de atendimentos"
        icon="🎯"
      >
        <div className="overflow-x-auto pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-max w-full">
            {KANBAN_DATA.map((column) => (
              <div
                key={column.id}
                className="flex flex-col w-96 h-[600px] rounded-lg border border-[#00FF9A]/20 bg-white/5"
              >
                {/* Column Header */}
                <div className={`p-4 border-b border-[#00FF9A]/20 bg-gradient-to-r ${column.color} to-transparent bg-opacity-10`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white text-lg">{column.title}</h3>
                    <span className="px-2 py-1 rounded-full bg-white/10 text-xs font-medium text-gray-300">
                      {column.cards.length}
                    </span>
                  </div>
                </div>

                {/* Cards Area */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {column.cards.map((card) => (
                    <div
                      key={card.id}
                      className="p-4 rounded-lg bg-white/10 border border-[#00FF9A]/20 hover:bg-white/15 hover:border-[#00FF9A]/40 transition-all cursor-grab active:cursor-grabbing group"
                    >
                      {/* Drag Handle */}
                      <div className="flex items-start gap-2 mb-2">
                        <GripVertical className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-white line-clamp-2">{card.title}</h4>
                        </div>
                      </div>

                      {/* Card Details */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">{card.avatar}</span>
                        <span className="text-xs text-gray-400">{card.contact}</span>
                      </div>

                      {/* Priority Badge */}
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${priorityColors[card.priority]}`}>
                        Prioridade: {priorityLabels[card.priority]}
                      </span>
                    </div>
                  ))}

                  {/* Add Card Button */}
                  <button className="w-full px-4 py-3 rounded-lg border border-dashed border-[#00FF9A]/40 text-[#00FF9A] hover:border-[#00FF9A] hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-sm font-medium">
                    <Plus className="w-4 h-4" />
                    Novo Card
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kanban Info */}
        <div className="mt-8 p-6 rounded-lg border border-[#00FF9A]/20 bg-white/5">
          <h3 className="text-lg font-semibold text-white mb-4">Dicas de Uso</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>✓ Arraste e solte cards entre as colunas para mudar o status</li>
            <li>✓ Clique em um card para visualizar detalhes completos</li>
            <li>✓ Use o botão "+" para adicionar novos atendimentos</li>
            <li>✓ Cards com prioridade alta aparecem no topo de cada coluna</li>
          </ul>
        </div>
      </PagePlaceholder>
    </div>
  )
}
