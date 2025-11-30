import React from 'react'
import PagePlaceholder from '@/components/PagePlaceholder'

export default function AutoQualifierPage() {
  return (
    <div className="min-h-screen bg-[#070707]">
      <PagePlaceholder
        title="Auto Qualifier"
        description="Qualifique automaticamente seus contatos"
        icon="⚡"
        actions={[
          {
            label: '+ ATIVAR',
            onClick: () => console.log('Activate plugin'),
            variant: 'primary'
          }
        ]}
      >
        <div className="max-w-3xl space-y-6">
          {/* Plugin Info */}
          <div className="p-6 rounded-lg border border-[#00FF9A]/20 bg-white/5">
            <h3 className="text-lg font-semibold text-white mb-3">O que é Auto Qualifier?</h3>
            <p className="text-gray-300 mb-4">
              O Auto Qualifier utiliza inteligência artificial para automaticamente classificar e qualificar seus contatos baseado em critérios que você define. Economize tempo e melhore a precisão da qualificação.
            </p>

            <h4 className="font-semibold text-white mb-3">Principais Benefícios:</h4>
            <ul className="space-y-2 text-gray-300">
              <li>✓ Qualificação automática 24/7</li>
              <li>✓ Reduz trabalho manual em 80%</li>
              <li>✓ Melhora taxa de conversão</li>
              <li>✓ Aprende com o tempo</li>
              <li>✓ Integração com seu CRM</li>
            </ul>
          </div>

          {/* Configuration */}
          <div className="p-6 rounded-lg border border-[#00FF9A]/20 bg-white/5">
            <h3 className="text-lg font-semibold text-white mb-4">Configurações</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Critério de Score Mínimo</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="60"
                  className="w-full"
                />
                <p className="text-xs text-gray-400 mt-1">Apenas contatos com score acima desse valor serão qualificados</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Campos para Análise</label>
                <div className="space-y-2">
                  {['Nome', 'Email', 'Telefone', 'Empresa', 'Mensagens'].map((field) => (
                    <label key={field} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-sm text-gray-300">{field}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Ação Automática</label>
                <select className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#00FF9A]/20 text-white focus:outline-none focus:border-[#00FF9A]">
                  <option>Adicionar tag "Qualificado"</option>
                  <option>Mover para coluna específica</option>
                  <option>Enviar para atendente</option>
                  <option>Criar tarefa</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="flex-1 px-6 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-medium">
                Cancelar
              </button>
              <button className="flex-1 px-6 py-2 rounded-lg bg-[#00FF9A] text-black hover:bg-[#00FF9A]/80 transition-colors font-medium">
                Salvar e Ativar
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Contatos Processados', value: '2,456' },
              { label: 'Taxa de Sucesso', value: '92%' },
              { label: 'Tempo Economizado', value: '156h' }
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-[#00FF9A]/20 bg-white/5 text-center">
                <p className="text-xs text-gray-400 mb-2">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </PagePlaceholder>
    </div>
  )
}
