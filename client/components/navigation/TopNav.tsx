import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  BarChart3,
  MessageSquare,
  Database,
  Send,
  Headphones,
  Shield,
  Settings,
  ChevronDown,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { MAIN_MENU, MenuItem, MenuSubItem } from '@/config/menu'
import DropdownMenu from './DropdownMenu'
import MobileSidebar from './MobileSidebar'

const ICON_COMPONENTS: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 className="w-5 h-5" />,
  MessageSquare: <MessageSquare className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Send: <Send className="w-5 h-5" />,
  Headphones: <Headphones className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
  ChevronDown: <ChevronDown className="w-4 h-4" />
}

export default function TopNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const userName = localStorage.getItem('userName') || 'Usuário'

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null)
  }, [location])

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('clientId')
    navigate('/')
  }

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.route && !item.submenu) {
      navigate(item.route)
    } else if (item.submenu) {
      setOpenDropdown(openDropdown === item.id ? null : item.id)
    }
  }

  return (
    <>
      {/* Desktop Top Navigation */}
      <header className="hidden lg:flex h-20 bg-[#0b0b0b] border-b border-[#00FF9A]/20 sticky top-0 z-40 px-6 items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fc7a665936108422ea7c0c4c7a1027698%2F62bee75c9cf54f7db5c6005f17af3083?format=webp&width=800"
            alt="Funcionou.AI"
            className="h-10 w-10 object-contain"
          />
          <div className="text-lg font-bold text-white">
            Funcionou.<span className="text-[#00FF9A]">AI</span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex items-center gap-2 flex-1" ref={dropdownRef}>
          {MAIN_MENU.map((item) => (
            <div key={item.id} className="relative group">
              <button
                onClick={() => handleMenuItemClick(item)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
                  'text-gray-300 hover:text-white hover:bg-white/5',
                  item.submenu && 'group'
                )}
                aria-haspopup={item.submenu ? 'true' : 'false'}
                aria-expanded={openDropdown === item.id}
              >
                <span className="text-[#00FF9A]">{ICON_COMPONENTS[item.icon]}</span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-[#00FF9A]/20 text-[#00FF9A] text-xs font-semibold">
                    {item.badge}
                  </span>
                )}
                {item.submenu && (
                  <ChevronDown className={cn('w-4 h-4 transition-transform', openDropdown === item.id && 'rotate-180')} />
                )}
              </button>

              {/* Desktop Dropdown Menu */}
              {item.submenu && openDropdown === item.id && (
                <DropdownMenu items={item.submenu} onItemClick={() => setOpenDropdown(null)} />
              )}
            </div>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Notificações"
            title="Notificações"
          >
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#00FF9A] rounded-full" />
          </button>

          <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-[#00FF9A]/20 bg-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF9A] to-[#00FF9A]/40" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">{userName}</span>
              <span className="text-xs text-gray-400">Admin</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Sair"
            title="Sair"
          >
            <LogOut className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden h-16 bg-[#0b0b0b] border-b border-[#00FF9A]/20 sticky top-0 z-40 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 hover:bg-white/5 rounded-lg"
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-300" />
            )}
          </button>
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fc7a665936108422ea7c0c4c7a1027698%2F62bee75c9cf54f7db5c6005f17af3083?format=webp&width=800"
            alt="Funcionou.AI"
            className="h-8 w-8 object-contain"
          />
        </div>

        <button
          onClick={handleLogout}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          aria-label="Sair"
        >
          <LogOut className="w-5 h-5 text-gray-400" />
        </button>
      </header>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <MobileSidebar onClose={() => setMobileOpen(false)} />
      )}
    </>
  )
}
