import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MAIN_MENU, MenuItem, MenuSubItem } from '@/config/menu'

interface MobileSidebarProps {
  onClose: () => void
}

const ICON_MAP: Record<string, string> = {
  BarChart3: '📊',
  MessageSquare: '💬',
  Database: '🗄️',
  Send: '📤',
  Headphones: '🎧',
  Shield: '🛡️',
  Settings: '⚙️'
}

export default function MobileSidebar({ onClose }: MobileSidebarProps) {
  const navigate = useNavigate()
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)
  const userName = localStorage.getItem('userName') || 'Usuário'

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('clientId')
    navigate('/')
  }

  const handleMenuClick = (item: MenuItem) => {
    if (item.submenu) {
      setExpandedMenu(expandedMenu === item.id ? null : item.id)
    } else if (item.route) {
      navigate(item.route)
      onClose()
    }
  }

  const handleSubMenuClick = (route: string) => {
    navigate(route)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside className="absolute left-0 top-0 h-full w-80 max-w-[90vw] bg-[#0b0b0b] border-r border-[#00FF9A]/20 overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-[#00FF9A]/20">
          <div className="flex items-center gap-3 mb-6">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fc7a665936108422ea7c0c4c7a1027698%2F62bee75c9cf54f7db5c6005f17af3083?format=webp&width=800"
              alt="Funcionou.AI"
              className="h-10 w-10 object-contain"
            />
            <div className="text-lg font-bold text-white">
              Funcionou.<span className="text-[#00FF9A]">AI</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00FF9A] to-[#00FF9A]/40" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">{userName}</span>
              <span className="text-xs text-gray-400">Admin</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {MAIN_MENU.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleMenuClick(item)}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium',
                  'text-gray-300 hover:text-white hover:bg-white/5',
                  'transition-all duration-150'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{ICON_MAP[item.icon] || '🔹'}</span>
                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-[#00FF9A]/20 text-[#00FF9A] text-xs font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>
                {item.submenu && (
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 transition-transform',
                      expandedMenu === item.id && 'rotate-180'
                    )}
                  />
                )}
              </button>

              {/* Submenu */}
              {item.submenu && expandedMenu === item.id && (
                <div className="mt-1 ml-4 border-l border-[#00FF9A]/20 pl-3 space-y-1">
                  {item.submenu.map((subitem) => (
                    <button
                      key={subitem.route}
                      onClick={() => handleSubMenuClick(subitem.route)}
                      className={cn(
                        'w-full text-left px-4 py-2 rounded-lg text-sm',
                        'text-gray-400 hover:text-white hover:bg-white/5',
                        'transition-all duration-150'
                      )}
                    >
                      {subitem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#00FF9A]/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </aside>
    </div>
  )
}
