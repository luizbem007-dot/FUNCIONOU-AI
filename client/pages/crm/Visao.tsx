import React from 'react'
import { TrendingUp, Users, MessageSquare, Clock } from 'lucide-react'
import PagePlaceholder from '@/components/PagePlaceholder'

const METRICS = [
  {
    title: 'Contatos Ativos',
    value: '1,234',
    icon: Users,
    change: '+12%',
    color: 'from-[#00FF9A]'
  },
  {
    title: 'Conversas Hoje',
    value: '456',
    icon: MessageSquare,
    change: '+8%',
    color: 'from-blue-500'
  },
  {
    title: 'Tempo Médio de Resposta',
    value: '2m 30s',
    icon: Clock,
    change: '-5%',
    color: 'from-purple-500'
  },
  {
    title: 'Taxa de Conversão',
    value: '23.5%',
    icon: TrendingUp,
    change: '+3%',
    color: 'from-green-500'
  }
]

export default function CRMVisaoPage() {
  return (
    <div className="min-h-screen bg-[#070707]">
      <PagePlaceholder
        title="CRM - Visão Geral"
        description="Dashboard com métricas principais"
        icon="📊"
      >
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {METRICS.map((metric) => {
            const Icon = metric.icon
            return (
              <div
                key={metric.title}
                className="p-6 rounded-lg border border-[#00FF9A]/20 bg-gradient-to-br from-white/5 to-transparent"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-[#00FF9A]/20 to-transparent">
                    <Icon className="w-6 h-6 text-[#00FF9A]" />
                  </div>
                  <span className="text-xs font-semibold text-green-400">{metric.change}</span>
                </div>

                <h3 className="text-sm text-gray-400 mb-2">{metric.title}</h3>
                <p className="text-3xl font-bold text-white">{metric.value}</p>
              </div>
            )
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversas por Dia */}
          <div className="p-6 rounded-lg border border-[#00FF9A]/20 bg-white/5">
            <h3 className="text-lg font-semibold text-white mb-4">Conversas por Dia</h3>
            <div className="h-48 flex items-end gap-2">
              {[45, 52, 38, 65, 48, 72, 58].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-[#00FF9A] to-[#00FF9A]/40 rounded-t opacity-80"
                  style={{ height: `${(height / 72) * 100}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              <span>Seg</span>
              <span>Ter</span>
              <span>Qua</span>
              <span>Qui</span>
              <span>Sex</span>
              <span>Sab</span>
              <span>Dom</span>
            </div>
          </div>

          {/* Status de Contatos */}
          <div className="p-6 rounded-lg border border-[#00FF9A]/20 bg-white/5">
            <h3 className="text-lg font-semibold text-white mb-4">Status dos Contatos</h3>
            <div className="space-y-3">
              {[
                { label: 'Novo', value: 345, percentage: 28, color: 'from-blue-500' },
                { label: 'Em Atendimento', value: 512, percentage: 42, color: 'from-yellow-500' },
                { label: 'Convertido', value: 289, percentage: 23, color: 'from-green-500' },
                { label: 'Pendente', value: 88, percentage: 7, color: 'from-red-500' }
              ].map((status) => (
                <div key={status.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300">{status.label}</span>
                    <span className="text-sm font-semibold text-white">{status.value}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${status.color} to-transparent`}
                      style={{ width: `${status.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="mt-8 p-6 rounded-lg border border-[#00FF9A]/20 bg-white/5">
          <h3 className="text-lg font-semibold text-white mb-4">Contatos Recentes</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-[#00FF9A]/20">
                <tr className="text-gray-400 text-xs uppercase tracking-wider">
                  <th className="text-left px-4 py-3 font-semibold">Nome</th>
                  <th className="text-left px-4 py-3 font-semibold">Telefone</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                  <th className="text-left px-4 py-3 font-semibold">Último Contato</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#00FF9A]/10">
                {[
                  { name: 'João Silva', phone: '(11) 99876-5432', status: 'Em Atendimento', last: '2 min' },
                  { name: 'Maria Santos', phone: '(21) 98765-4321', status: 'Convertido', last: '1h' },
                  { name: 'Pedro Costa', phone: '(31) 97654-3210', status: 'Pendente', last: '3h' }
                ].map((contact) => (
                  <tr key={contact.name} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-white">{contact.name}</td>
                    <td className="px-4 py-3 text-gray-400">{contact.phone}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        contact.status === 'Convertido' ? 'bg-green-500/20 text-green-300' :
                        contact.status === 'Em Atendimento' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{contact.last}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PagePlaceholder>
    </div>
  )
}
