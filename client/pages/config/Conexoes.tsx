import React, { useState } from 'react'
import { Wifi, WifiOff, Settings2 } from 'lucide-react'
import PagePlaceholder from '@/components/PagePlaceholder'
import Modal from '@/components/Modal'

interface Integration {
  id: string
  name: string
  icon: string
  description: string
  connected: boolean
  lastSynced?: string
}

const INTEGRATIONS: Integration[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    icon: '💬',
    description: 'Conecte sua conta WhatsApp Business para sincronizar mensagens',
    connected: true,
    lastSynced: '2024-11-20 10:30'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: '📱',
    description: 'Integre seu bot do Telegram para atendimento automático',
    connected: false
  },
  {
    id: 'zapier',
    name: 'Zapier',
    icon: '⚡',
    description: 'Crie automações com Zapier e integre com milhares de apps',
    connected: true,
    lastSynced: '2024-11-19 15:45'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    icon: '💳',
    description: 'Receba pagamentos e gerencie transações com Stripe',
    connected: false
  },
  {
    id: 'google',
    name: 'Google Workspace',
    icon: '📧',
    description: 'Sincronize contatos e calendários do Google',
    connected: true,
    lastSynced: '2024-11-20 09:15'
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: '💼',
    description: 'Receba notificações de atendimentos no Slack',
    connected: false
  }
]

export default function ConexoesPage() {
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)

  return (
    <div className="min-h-screen bg-[#070707]">
      <PagePlaceholder
        title="Configurações - Conexões"
        description="Gerencie integrações com terceiros"
        icon="🔌"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INTEGRATIONS.map((integration) => (
            <div
              key={integration.id}
              className="p-6 rounded-lg border border-[#00FF9A]/20 bg-white/5 hover:bg-white/10 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{integration.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{integration.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {integration.connected ? (
                        <span className="flex items-center gap-1 text-green-300">
                          <Wifi className="w-3 h-3" />
                          Conectado
                          {integration.lastSynced && <span className="text-gray-500">• Sincronizado em {integration.lastSynced}</span>}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-gray-400">
                          <WifiOff className="w-3 h-3" />
                          Desconectado
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-4">{integration.description}</p>

              <div className="flex gap-2">
                {integration.connected ? (
                  <>
                    <button
                      onClick={() => setSelectedIntegration(integration)}
                      className="flex-1 px-4 py-2 text-sm rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <Settings2 className="w-4 h-4" />
                      Configurar
                    </button>
                    <button className="px-4 py-2 text-sm rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors font-medium">
                      Desconectar
                    </button>
                  </>
                ) : (
                  <button className="w-full px-4 py-2 text-sm rounded-lg bg-[#00FF9A] text-black hover:bg-[#00FF9A]/80 transition-colors font-medium">
                    Conectar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Integration Configuration Modal */}
        {selectedIntegration && (
          <Modal onClose={() => setSelectedIntegration(null)}>
            <div className="max-w-md">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <span>{selectedIntegration.icon}</span>
                {selectedIntegration.name}
              </h2>
              <p className="text-gray-400 text-sm mb-6">{selectedIntegration.description}</p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">API Key</label>
                  <input
                    type="password"
                    placeholder="Cole sua API key"
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#00FF9A]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF9A]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status de Sincronização</label>
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-sm text-green-300">✓ Conectado com sucesso</p>
                    <p className="text-xs text-gray-400 mt-1">Última sincronização: {selectedIntegration.lastSynced}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-medium"
                >
                  Fechar
                </button>
                <button className="flex-1 px-4 py-2 rounded-lg bg-[#00FF9A] text-black hover:bg-[#00FF9A]/80 transition-colors font-medium">
                  Salvar
                </button>
              </div>
            </div>
          </Modal>
        )}
      </PagePlaceholder>
    </div>
  )
}
