import React, { useState } from 'react'
import PagePlaceholder from '@/components/PagePlaceholder'

export default function PreferenciasPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    darkMode: true,
    soundNotifications: false,
    autoSave: true,
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    theme: 'neon'
  })

  const handleToggle = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSelectChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-[#070707]">
      <PagePlaceholder
        title="Configurações - Preferências"
        description="Personalize sua experiência"
        icon="⚙️"
      >
        <div className="max-w-2xl space-y-8">
          {/* Notificações */}
          <div className="p-6 rounded-lg border border-[#00FF9A]/20 bg-white/5">
            <h3 className="text-lg font-semibold text-white mb-4">Notificações</h3>

            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-3 rounded-lg transition-colors">
                <div>
                  <p className="text-sm font-medium text-white">Notificações Push</p>
                  <p className="text-xs text-gray-400">Receba notificações em tempo real</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={() => handleToggle('notifications')}
                  className="w-6 h-6 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-3 rounded-lg transition-colors">
                <div>
                  <p className="text-sm font-medium text-white">Alertas por Email</p>
                  <p className="text-xs text-gray-400">Receba resumo diário por email</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.emailAlerts}
                  onChange={() => handleToggle('emailAlerts')}
                  className="w-6 h-6 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-3 rounded-lg transition-colors">
                <div>
                  <p className="text-sm font-medium text-white">Som nas Notificações</p>
                  <p className="text-xs text-gray-400">Ouça um som ao receber notificação</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.soundNotifications}
                  onChange={() => handleToggle('soundNotifications')}
                  className="w-6 h-6 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Aparência */}
          <div className="p-6 rounded-lg border border-[#00FF9A]/20 bg-white/5">
            <h3 className="text-lg font-semibold text-white mb-4">Aparência</h3>

            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-3 rounded-lg transition-colors">
                <div>
                  <p className="text-sm font-medium text-white">Modo Escuro</p>
                  <p className="text-xs text-gray-400">Interface em cores escuras</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={() => handleToggle('darkMode')}
                  className="w-6 h-6 cursor-pointer"
                />
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tema</label>
                <select
                  value={settings.theme}
                  onChange={(e) => handleSelectChange('theme', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#00FF9A]/20 text-white focus:outline-none focus:border-[#00FF9A]"
                >
                  <option value="neon">Neon Verde</option>
                  <option value="blue">Azul</option>
                  <option value="purple">Roxo</option>
                  <option value="custom">Personalizado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Idioma e Região */}
          <div className="p-6 rounded-lg border border-[#00FF9A]/20 bg-white/5">
            <h3 className="text-lg font-semibold text-white mb-4">Idioma e Região</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Idioma</label>
                <select
                  value={settings.language}
                  onChange={(e) => handleSelectChange('language', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#00FF9A]/20 text-white focus:outline-none focus:border-[#00FF9A]"
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Fuso Horário</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleSelectChange('timezone', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-[#00FF9A]/20 text-white focus:outline-none focus:border-[#00FF9A]"
                >
                  <option value="America/Sao_Paulo">São Paulo (UTC-3)</option>
                  <option value="America/Rio_Branco">Rio Branco (UTC-5)</option>
                  <option value="America/Manaus">Manaus (UTC-4)</option>
                  <option value="America/Argentina/Buenos_Aires">Buenos Aires (UTC-3)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sistema */}
          <div className="p-6 rounded-lg border border-[#00FF9A]/20 bg-white/5">
            <h3 className="text-lg font-semibold text-white mb-4">Sistema</h3>

            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-3 rounded-lg transition-colors">
                <div>
                  <p className="text-sm font-medium text-white">Salvar Automaticamente</p>
                  <p className="text-xs text-gray-400">Salve suas alterações automaticamente</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoSave}
                  onChange={() => handleToggle('autoSave')}
                  className="w-6 h-6 cursor-pointer"
                />
              </label>

              <div className="p-3 rounded-lg bg-white/5 border border-[#00FF9A]/20">
                <p className="text-sm text-gray-300 mb-2">Versão da Aplicação</p>
                <p className="text-xs text-gray-400">v2.4.1 • Atualizado em 20 de novembro de 2024</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-medium">
              Restaurar Padrões
            </button>
            <button className="flex-1 px-6 py-3 rounded-lg bg-[#00FF9A] text-black hover:bg-[#00FF9A]/80 transition-colors font-medium">
              Salvar Alterações
            </button>
          </div>
        </div>
      </PagePlaceholder>
    </div>
  )
}
