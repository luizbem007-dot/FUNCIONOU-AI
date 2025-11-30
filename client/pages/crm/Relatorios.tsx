import React, { useState } from 'react'
import { Download, Filter } from 'lucide-react'
import PagePlaceholder from '@/components/PagePlaceholder'

const REPORTS = [
  {
    id: 'r1',
    title: 'Relatório de Conversão',
    description: 'Taxa de conversão por período',
    date: '2024-11-20',
    format: 'PDF',
    size: '2.4 MB'
  },
  {
    id: 'r2',
    title: 'Análise de Contatos',
    description: 'Distribuição de contatos por status',
    date: '2024-11-19',
    format: 'Excel',
    size: '1.8 MB'
  },
  {
    id: 'r3',
    title: 'Desempenho de Atendentes',
    description: 'Métricas individuais de performance',
    date: '2024-11-18',
    format: 'PDF',
    size: '3.2 MB'
  },
  {
    id: 'r4',
    title: 'Relatório de Receita',
    description: 'Análise de receita por setor',
    date: '2024-11-17',
    format: 'Excel',
    size: '2.1 MB'
  },
  {
    id: 'r5',
    title: 'Tendências de Mercado',
    description: 'Análise de tendências em tempo real',
    date: '2024-11-16',
    format: 'PDF',
    size: '4.5 MB'
  }
]

export default function RelatoriosPage() {
  const [filterFormat, setFilterFormat] = useState<string | null>(null)

  const filteredReports = filterFormat
    ? REPORTS.filter(r => r.format === filterFormat)
    : REPORTS

  return (
    <div className="min-h-screen bg-[#070707]">
      <PagePlaceholder
        title="CRM - Relatórios"
        description="Gere e gerencie seus relatórios"
        icon="📈"
        actions={[
          {
            label: '+ NOVO RELATÓRIO',
            onClick: () => console.log('Create report'),
            variant: 'primary'
          }
        ]}
      >
        {/* Filters */}
        <div className="mb-6 flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex gap-2">
            {['PDF', 'Excel', 'CSV'].map((format) => (
              <button
                key={format}
                onClick={() => setFilterFormat(filterFormat === format ? null : format)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterFormat === format
                    ? 'bg-[#00FF9A] text-black'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {format}
              </button>
            ))}
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="p-6 rounded-lg border border-[#00FF9A]/20 bg-white/5 hover:bg-white/10 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{report.title}</h3>
                  <p className="text-sm text-gray-400">{report.description}</p>
                </div>
                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    report.format === 'PDF'
                      ? 'bg-red-500/20 text-red-300'
                      : report.format === 'Excel'
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    {report.format}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-500">
                  <span>{report.date}</span>
                  <span className="mx-2">•</span>
                  <span>{report.size}</span>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00FF9A]/20 text-[#00FF9A] hover:bg-[#00FF9A]/30 transition-colors font-medium text-sm">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Report Builder */}
        <div className="mt-8 p-6 rounded-lg border border-[#00FF9A]/20 bg-white/5">
          <h3 className="text-lg font-semibold text-white mb-4">Criar Relatório Personalizado</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Período</label>
              <select className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#00FF9A]/20 text-white focus:outline-none focus:border-[#00FF9A]">
                <option>Últimos 7 dias</option>
                <option>Últimos 30 dias</option>
                <option>Últimos 90 dias</option>
                <option>Este ano</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Métrica</label>
              <select className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#00FF9A]/20 text-white focus:outline-none focus:border-[#00FF9A]">
                <option>Conversão</option>
                <option>Contatos</option>
                <option>Receita</option>
                <option>Performance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Formato</label>
              <select className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#00FF9A]/20 text-white focus:outline-none focus:border-[#00FF9A]">
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
            </div>
          </div>

          <button className="mt-4 px-6 py-2 rounded-lg bg-[#00FF9A] text-black hover:bg-[#00FF9A]/80 font-medium transition-all">
            Gerar Relatório
          </button>
        </div>
      </PagePlaceholder>
    </div>
  )
}
