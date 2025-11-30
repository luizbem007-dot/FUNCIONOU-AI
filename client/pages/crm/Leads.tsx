import React from 'react'
import { TrendingUp } from 'lucide-react'
import PagePlaceholder from '@/components/PagePlaceholder'

const LEADS_DATA = [
  {
    id: 'l1',
    name: 'Tech Solutions Inc',
    contact: 'Roberto Costa',
    email: 'roberto@techsolutions.com',
    phone: '(11) 98765-4321',
    status: 'qualification',
    value: 'R$ 45.000',
    daysActive: 12,
    avatar: '🏢'
  },
  {
    id: 'l2',
    name: 'Global Marketing',
    contact: 'Jessica Lima',
    email: 'jessica@globalmarketing.com',
    phone: '(21) 97654-3210',
    status: 'proposal',
    value: 'R$ 32.000',
    daysActive: 7,
    avatar: '📱'
  },
  {
    id: 'l3',
    name: 'Creative Agency',
    contact: 'Lucas Mendes',
    email: 'lucas@creativeagency.com',
    phone: '(31) 96543-2109',
    status: 'negotiation',
    value: 'R$ 28.500',
    daysActive: 5,
    avatar: '🎨'
  },
  {
    id: 'l4',
    name: 'Logistics Pro',
    contact: 'Amanda Silva',
    email: 'amanda@logisticspro.com',
    phone: '(41) 95432-1098',
    status: 'qualification',
    value: 'R$ 67.000',
    daysActive: 20,
    avatar: '🚚'
  }
]

const statusColors: Record<string, string> = {
  qualification: 'bg-blue-500/20 text-blue-300',
  proposal: 'bg-yellow-500/20 text-yellow-300',
  negotiation: 'bg-orange-500/20 text-orange-300',
  closed: 'bg-green-500/20 text-green-300'
}

const statusLabels: Record<string, string> = {
  qualification: 'Qualificação',
  proposal: 'Proposta',
  negotiation: 'Negociação',
  closed: 'Fechado'
}

export default function LeadsPage() {
  return (
    <div className="min-h-screen bg-[#070707]">
      <PagePlaceholder
        title="CRM - Leads"
        description="Acompanhe seus leads em progresso"
        icon="📈"
        actions={[
          {
            label: '+ NOVO LEAD',
            onClick: () => console.log('Create lead'),
            variant: 'primary'
          }
        ]}
      >
        {/* Pipeline Overview */}
        <div className="mb-8 p-6 rounded-lg border border-[#00FF9A]/20 bg-white/5">
          <h3 className="text-lg font-semibold text-white mb-4">Visão do Pipeline</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { stage: 'Qualificação', count: 8, value: 'R$ 156.000' },
              { stage: 'Proposta', count: 5, value: 'R$ 120.500' },
              { stage: 'Negociação', count: 3, value: 'R$ 89.000' },
              { stage: 'Fechado', count: 12, value: 'R$ 450.000' }
            ].map((stage) => (
              <div key={stage.stage} className="p-4 rounded-lg bg-white/10 border border-[#00FF9A]/20">
                <p className="text-xs text-gray-400 mb-2">{stage.stage}</p>
                <p className="text-2xl font-bold text-white mb-1">{stage.count}</p>
                <p className="text-xs text-[#00FF9A]">{stage.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leads Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#00FF9A]/20 sticky top-0 bg-[#0b0b0b]">
              <tr className="text-gray-400 text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-4 font-semibold">Empresa</th>
                <th className="text-left px-6 py-4 font-semibold">Contato</th>
                <th className="text-left px-6 py-4 font-semibold">Email</th>
                <th className="text-left px-6 py-4 font-semibold">Status</th>
                <th className="text-left px-6 py-4 font-semibold">Valor</th>
                <th className="text-left px-6 py-4 font-semibold">Dias Ativo</th>
                <th className="text-left px-6 py-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#00FF9A]/10">
              {LEADS_DATA.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-white/5 transition-colors border-b border-[#00FF9A]/10"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lead.avatar}</span>
                      <span className="text-white font-medium">{lead.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{lead.contact}</td>
                  <td className="px-6 py-4 text-gray-400">{lead.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[lead.status]}`}>
                      {statusLabels[lead.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-[#00FF9A]">{lead.value}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{lead.daysActive} dias</td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1 text-xs rounded bg-[#00FF9A]/20 text-[#00FF9A] hover:bg-[#00FF9A]/30 transition-colors">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PagePlaceholder>
    </div>
  )
}
