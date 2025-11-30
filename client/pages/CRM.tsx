import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import KanbanBoard from '@/components/KanbanBoard'

export default function CRM() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="border-b bg-black/80 backdrop-blur-sm sticky top-0 z-40" style={{ borderColor: 'rgba(0,255,154,0.06)' }}>
        <div className="px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">
              Funcionou.<span className="text-[#00FF9A]">AI</span>
            </div>
            <button
              onClick={handleLogout}
              className="h-10 w-10 rounded-lg border hover:bg-red-600/20 transition-colors flex items-center justify-center"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              aria-label="Sair"
            >
              <LogOut className="h-5 w-5 text-red-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Kanban Board */}
      <div className="flex-1 overflow-hidden">
        <KanbanBoard showHeader={true} />
      </div>

      {/* Footer watermark */}
      <div className="py-8 text-center text-[#666] text-sm border-t" style={{ borderColor: 'rgba(0,255,154,0.06)' }}>
        <p>© 2024 Funcionou.AI • Premium CRM for Businesses</p>
      </div>
    </div>
  )
}
