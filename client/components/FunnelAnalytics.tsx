import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useCRM } from '@/context/CRMContext'

export default function FunnelAnalytics() {
  const { customers } = useCRM()

  // Calculate counts by stage
  const stageData = [
    {
      name: 'Novos',
      value: customers.filter(c => c.stage === 'new').length,
      fill: '#00B8FF'
    },
    {
      name: 'Atendimento',
      value: customers.filter(c => c.stage === 'attending').length,
      fill: '#00FF9A'
    },
    {
      name: 'Retorno',
      value: customers.filter(c => c.stage === 'waiting').length,
      fill: '#FFB800'
    },
    {
      name: 'Concluído',
      value: customers.filter(c => c.stage === 'completed').length,
      fill: '#6B5FFF'
    }
  ]

  const total = customers.length
  const conversion = total > 0 ? ((customers.filter(c => c.stage === 'completed').length / total) * 100).toFixed(1) : 0

  return (
    <div className="rounded-lg border p-6 col-span-1 md:col-span-2" style={{ borderColor: 'rgba(0,255,154,0.1)', backgroundColor: 'rgba(10,10,10,0.8)' }}>
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Funil de Leads (Últimos 7 dias)</h3>
        <div className="grid grid-cols-4 gap-4">
          {stageData.map((stage) => (
            <div key={stage.name} className="p-4 rounded-lg bg-[#0F0F0F] border" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="text-2xl font-bold" style={{ color: stage.fill }}>{stage.value}</div>
              <div className="text-xs text-[#666] mt-1">{stage.name}</div>
            </div>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={stageData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="name" stroke="#666" style={{ fontSize: '12px' }} />
          <YAxis stroke="#666" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1A1A1A',
              border: 'rgba(0,255,154,0.2) 1px solid',
              borderRadius: '8px'
            }}
            labelStyle={{ color: '#fff' }}
          />
          <Bar dataKey="value" fill="#00FF9A" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 p-4 rounded-lg bg-[#1A1A1A] border" style={{ borderColor: 'rgba(0,255,154,0.1)' }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-[#666]">Taxa de Conversão</div>
            <div className="text-2xl font-bold text-[#00FF9A]">{conversion}%</div>
          </div>
          <div>
            <div className="text-sm text-[#666]">Total de Leads</div>
            <div className="text-2xl font-bold">{total}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
