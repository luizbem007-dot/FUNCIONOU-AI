import React from 'react'
import PagePlaceholder from '@/components/PagePlaceholder'

export default function BotManagerPage() {
  return (
    <div className="min-h-screen bg-[#070707]">
      <PagePlaceholder
        title="Bot Manager"
        description="Gerencie seus bots de atendimento"
        icon="🤖"
        actions={[
          {
            label: '+ CRIAR BOT',
            onClick: () => console.log('Create bot'),
            variant: 'primary'
          }
        ]}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'Bot Inicial', status: 'Ativo', conversations: 1234, accuracy: 92 },
            { name: 'Bot FAQ', status: 'Ativo', conversations: 456, accuracy: 88 },
            { name: 'Bot Agendamento', status: 'Inativo', conversations: 0, accuracy: 95 }
          ].map((bot, idx) => (
            <div key={idx} className="p-6 rounded-lg border border-[#00FF9A]/20 bg-white/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{bot.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  bot.status === 'Ativo'
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-gray-500/20 text-gray-300'
                }`}>
                  {bot.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-white/10">
                  <p className="text-xs text-gray-400 mb-1">Conversas</p>
                  <p className="text-2xl font-bold text-white">{bot.conversations}</p>
                </div>
                <div className="p-3 rounded-lg bg-white/10">
                  <p className="text-xs text-gray-400 mb-1">Precisão</p>
                  <p className="text-2xl font-bold text-[#00FF9A]">{bot.accuracy}%</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 text-sm rounded-lg bg-[#00FF9A]/20 text-[#00FF9A] hover:bg-[#00FF9A]/30 transition-colors font-medium">
                  Editar
                </button>
                <button className="flex-1 px-4 py-2 text-sm rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-medium">
                  Configurar
                </button>
              </div>
            </div>
          ))}
        </div>
      </PagePlaceholder>
    </div>
  )
}
